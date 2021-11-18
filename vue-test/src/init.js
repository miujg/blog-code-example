import { initState } from "./state"

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    // 状态初始化 数据观测 data， methods 代理...
    // initState(vm)
    initState(vm)
  }
}
