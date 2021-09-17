import { observe } from './observe/index'

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
  if(opts.watch) {

  }
}

function initData(vm) {
  let data = vm.$options.data
  // data 可能是对象也可能是函数
  data = vm._data = typeof data === 'function'? data.call(vm) : data
  // 对象劫持 用户改变数据 我得到通知
  // Object.defineProperties 响应式原理
  observe(data)
  // console.log(data)
  // Object.keys(data).forEach(key => {
  //   Object.defineProperty(data, key, {
  //     get() {},
  //     set() {}
  //   })
  // })
  
}