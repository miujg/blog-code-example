// 实现 new proxy(target, handler)

import { extend, hasChanged, hasOwn, isArray, isIntergetKey, isObject } from "@vue/shared"
import { reactive, readonly } from "."
import { track, trigger } from "./effect"
import { TrackOptypes, TriggerOrTypes } from "./operators"

// 仅读 set的时候报异常
// 是不是深度

const get = createGetter()
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

const set = createSetter()
const shallowSet = createSetter(true)

const readonlySet = {
  set: (target, key) => {
    console.log(`set on key ${key} fail`)
  }
}

export const mutableHandlers = {
  get,
  set
}
export const shallowReactiveHandlers = {
  get: shallowGet,
  set: shallowSet
}
export const readonlyHandlers = extend({
  get: readonlyGet,
}, readonlySet)
export const shallowReadonlyHandlers = extend({
  get: shallowReadonlyGet,
  // 疑问？ 第二层还可以改吗
}, readonlySet)

// 核心拦截获取功能
function createGetter(isReadonly = false, isShallow = false) {
  /**
   * 这个三个参数就是 new Proxy，get的三个参数
   */
  return function get(target, key, reaciver) {
    // Reflect：to-do
    // 后续object的方法，迁移到Reflect
    // target[key] = value, 可能会失败，并不会报异常，也没有返回表示。 Reflect具备返回值
    // Reflect 与 proxy没特别的关系，只是经常组合在一起用

    // reaciver是代理对象
    // {name: 'xxx', firends: [{name: 'yyy}]} 此时的res为第二层: 'xxx'、[{name: 'yyy'}]
    const res = Reflect.get(target, key, reaciver)

    // 不是readonly 搜集依赖
    if (!isReadonly) {
      // 搜集依赖， 数据变化后更新相应视图
      // 属性记住响应式effect ---> 搜集effect
      track(target, TrackOptypes.GET, key)

    }

    // 因为res是第二层，且是浅的，所以直接返回
    if (isShallow) {
      return res
    }

    // 不是浅的 得到的res是对象，再次对res进行代理
    // 此处对比vue2 性能好很多。vue2直接一就全部递归设置
    // 此处只有被取值得时候才会使用到(懒代理)
    if (isObject(res)) {
      return isReadonly? readonly(res) : reactive(res)
    }

    return res
  }
}

// 核心拦截设置功能
function createSetter(isShallow = false) {
  return function set(target, key, value, reciver) {
    // 获取老值 可能是对象 可能是数组 可能是基本类型
    const oldValue = target[key]

    // 数组 还是索引
    // 索引在数组范围内没
    // 这个方法就是判断是否新增属性
    const hadKey = isArray(oldValue) && isIntergetKey(key)? Number(key) < target.length : 
    hasOwn(target, key) 

    // 设置新值
    const result = Reflect.set(target, key, value, reciver)
    if(!hadKey) {
      // 对象新增的属性 或者 数组新增索引
      trigger(target, TriggerOrTypes.ADD, key, value)
    } else if (hasChanged(oldValue, value)) {
      // 值有改变
      trigger(target, TriggerOrTypes.SET, key, value, oldValue)
    } else {
      // 值没改变
    }

    // 区分新增还是修改
    // 数组 vue2 无法监控更改索引 无法更改数组的长度

    // 判断是否是新增


    // 数据更新的时， 通知应有属性的effect重新执行

    return result
  }
}