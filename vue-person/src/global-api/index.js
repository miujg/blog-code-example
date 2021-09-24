import { megerOptions } from "../util/index"

export function initGlobalApi(Vue) {
  // 存储全局配置 如：多次调用mixin。 包括： filter directive component
  Vue.options = {}
  Vue.mixin = function (mixin) {
    // megerOptions
    this.options = megerOptions(this.options, mixin)
    return this
  }
}