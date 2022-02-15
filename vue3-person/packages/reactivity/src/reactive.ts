import { isObject } from "@vue/shared"
import {
  mutableHandlers,
  shallowReactiveHandlers,
  shallowReadonlyHandlers,
  readonlyHandlers
} from './baseHandlers'

export function reactive (target) {
  return createReactiveObject(target, false, mutableHandlers)
}

export function shallowReactive (target) {
  return createReactiveObject(target, false, shallowReactiveHandlers)
}

export function readonly (target) {
  return createReactiveObject(target, false, readonlyHandlers)
}

export function shallowReadonly (target) {
  return createReactiveObject(target, false, shallowReadonlyHandlers)
}

// 缓存 存储已经被代理过得对象
const reactiveMap = new WeakMap() // 好处是自动垃圾回收。 存储的key只能是对象
const readonlyMap = new WeakMap()


// 是不是进仅读， 是不是深度  curry实现
// new Proxy() 拦截数据的读取和修改
/**
 * 
 * @param target 代理目标
 * @param isReadonly 是否只读
 * @param baseHandler 用于proxy的handler
 * @returns 
 */
export function createReactiveObject (target, isReadonly, baseHandler) {
  // 如果目标不是对象 无法拦截。 
  // 基本类型使用ref
  if (!isObject(target)) {
    return target
  }
  // 如果某个对象已经被代理， 就不要再次被代理
  // 分情况 设置缓存
  const proxyMap = isReadonly? readonlyMap : reactiveMap
  // 是否已经被代理
  const exisitProxy = proxyMap.get(target)
  if (exisitProxy) {
    return exisitProxy
  }
  const proxy = new Proxy(target, baseHandler)
  proxyMap.set(target, proxy) // key： 被代理的对象 value： 代理对象
  return proxy

}
