import { isArray, isIntergetKey } from "@vue/shared"
import { TriggerOrTypes } from "./operators"

let uid = 0
// 当前正在运行的effect
let activeEffect:any
// effect栈
let effectStack:any[] = []
// 搜集依赖的栈
const targetMap = new WeakMap()

export function effect(fn, options:any = {}) {
  // 让effect变为响应effect，数据变化重新执行
  
  const effect:any = createReactiveEffect(fn, options)

  // 默认会先执行,除非配置了lazy
  if (!options.lazy) {
    effect()
  }

  return effect
}

function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect () {
    // 已经加入过得effect，不再加入
    if (!effectStack.includes(effect)) {
    // if (true) {
      try {
        // 必须放在这里，品
        effectStack.push(effect)
        activeEffect = effect
        // 函数取值，执行get方法 
        return fn()
      } finally {
        effectStack.pop()
        // 重置activeeffect, 取栈的最顶层
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  effect.id = uid++ // effect唯一标识，标识可用于排序
  effect._isEffect = true // 标识effect是一个响应式effect
  effect.raw = fn // 响应式effect对应的原始函数
  effect.options = options // 响应式effect的原始options
  return effect
}

/**
 * 依赖搜集
 * @param target 哪个对象
 * @param action 什么操作
 * @param key 对象的哪个值
 */
export function track(target, action, key) {
  // activeEffect
  if (activeEffect == undefined) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set))
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
  }
}

// 找属性对应的effect
export function trigger(target, type, key, newValue?, oldValue?) {
  // 如果这个属性没有搜集过effect 不需要做任何操作
  const depsMap = targetMap.get(target)
  if(!depsMap) return
  // 将所有要执行的effect 全部存到一个新的集合，在一起执行
  const effects = new Set()
  const add = (effectsToAdd) => {
    // 次数的effectsToAdd为一个set
    if(effectsToAdd) {
      // 遍历属性对应的effect的set，将其加入到effects，
      effectsToAdd.forEach(effect => {
        effects.add(effect)
      })
    }
  }

  // 看修改的是不是数组的长度， 改长度影响比较大 state.arr[2] = 2 state.arr.length = 1 变吗？
  if (isArray(target) && key === 'length') {
    // 如果对应的长度 有依赖搜集
    depsMap.forEach((dep, key) => {
      // 此时newValue为更改length的值， old为原始数组的值
      // 这种情况吧数组的长度改得比之前小了
      if(key === 'length' && oldValue > newValue) {
        add(dep)
      }
    })
  } else {
    // 可能是对象
    if(key !== undefined) { // 这里是修改
      add(depsMap.get(key)) 
    }
    // 修改数组中的某一个索引 怎么办?state.arr ([1,2,3]) => state.arr[100] 100这一项没有搜集到依赖，要更新吗？
    // 特殊处理了，如果直接修改索引， length的effect也加入进去
    switch(type) {
      case TriggerOrTypes.ADD:
        if (isArray(target) && isIntergetKey(key)) {
          add(depsMap.get('length'))
        }
    }
  }

  effects.forEach((effect:any) => {
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    } else {
      effect()
    }
  })
}

// {name: 'jgmiu', age: 19} => name => [effect1, effect2]

// -----使用栈来记录activeEffect的原因：

// effect(() => { -> effect1
//   state.name -> effect1
//   effect(() => {
//     state.age -> effect2
//   })
//   state.address -> effect2
// })

// --- effect死循环代码, 品一下 测试一下
// effect(() => {
//   state.i ++ 
// })

// state.i = state.i + 1 状态变了 重新执行
// state.i = state.i + 1 状态又变了 有重新执行
// state.i = state.i + 1 状态又变了 有重新执行
// .....

