import { observe } from './observe/index'
import Watcher from './observe/watcher'
import { isObject } from './util/index'

export function initState(vm) {
  const opts = vm.$options
  // vue的数据来源 属性 方法 数据 计算属性 watch
  if(opts.props) {

  }
  if(opts.methods) {

  }
  if(opts.data) {
    initData(vm)
  }
  // 如果有watch
  if(opts.watch) {
    initWatch(vm, opts.watch)
  }
}

function initData(vm) {
  let data = vm.$options.data
  // data 可能是对象也可能是函数
  data = vm._data = typeof data === 'function'? data.call(vm) : data
  // 对象劫持 用户改变数据 我得到通知
  // Object.defineProperties 响应式原理

  // proxy vm_.data[key] === vm[key]
  Object.keys(vm._data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm._data[key]
      },
      set(val) {
        vm._data[key] = val
      }
    })
  })
  observe(data)
}

// watch 的原理 watcher
// 创建watcher
function initWatch(vm, watch) {
  // 初始化 watch
  // 1. watch是个对象 遍历。
  // a. 
  for(let key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for(let i = 0; i < handler.length; i--) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

// 创建watcher
function createWatcher(vm, key, handler, options) {
  if (isObject(handler)) {
    options = handler
    handler = handler.handler
  }
  // 如果是字符串 去 methods去找
  if(typeof handler === 'string') {
    handler = vm.$options[handler]
  }
  // watch 的原理 就是$watch
  return vm.$watch(key, handler, options)
}

export function stateMixin(Vue) {
  const vm = this
  Vue.prototype.$watch = function(exprOrFunction, cb, options) {
    // 用户watcher
    options.user = true
    new Watcher(vm, exprOrFunction, cb, options)
  }
}