// 实现 new proxy(target, handler)

import { extend, isObject } from "@vue/shared"
import { reactive, readonly } from "."

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
  // reaciver为代理对象
  return function get(target, key, reaciver) {
    
    // Reflect：to-do
    // 后续object的方法，迁移到Reflect
    // target[key] = value, 可能会失败，并不会报异常，也没有返回表示。 Reflect具备返回值
    // Reflect 与 proxy没特别的关系，只是经常组合在一起用

    // reaciver是代理对象
    // {name: 'xxx', firends: [{name: 'yyy}]} 此时的res为第二层
    const res = Reflect.get(target, key, reaciver)

    if (!isReadonly) {
      // 搜集依赖， 数据变化后更新相应视图
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
    const res = Reflect.set(target, key, value, reciver)
  }
}