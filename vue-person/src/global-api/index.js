import { megerOptions } from "../util/index"

export function initGlobalApi(Vue) {
  // 存储全局配置 如：多次调用mixin。 包括： filter directive component
  Vue.options = {}
  Vue.mixin = function (mixin) {
    // megerOptions
    this.options = megerOptions(this.options, mixin)
    return this
  }
  
  Vue.options._base = Vue // Vue的构造函数 后面会用到
  Vue.options.components = {} // 用来存放组件的定义
  Vue.component = function(id, definition) {
    // ？、
    definition.name = definition.name || id
    // 通过对象产生一个类（构造函数），属于子组件
    // 理解这里为什么用 this.options._base
    definition = this.options._base.extend(definition)
    this.options.components[id] = definition
  }
  let cid = 0
  Vue.extend = function(options) {
    const Super = this
    // 子组件初始化是 会new VueComponent
    const Sub = function VueComponent ( ){
      this._init(options)
    }
    Sub.cid = cid++
    Sub.prototype = Object.create(Super.prototype) // 都是通过Vue继承 保证只有两层继承关系
    Sub.prototype.constructor = Sub // constructor指向修正
    // options 合并
    Sub.options = megerOptions(Super.options, options)
    return Sub // 返回构造函数 由对象产生
  }
  // Sub.compontent this指向子类 要一直指向Vue 所以使用_base
}