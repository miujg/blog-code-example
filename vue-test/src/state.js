import { observe } from "./observe/index"
import { proxy } from "./util/index"

export function initState(vm) {
  const opts = vm.$options

  if(opts.data) initData(vm)
}

function initData(vm) {
  // 获取data
  let data = vm.$options.data
  // data 可能是对象也可能是函数
  data = vm._data = typeof data === 'function'? data.call(vm) : data
  proxy(vm, data)
  observe(data)
}