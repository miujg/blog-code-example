import { createElement, createTextVnode } from './vdom/index'

export function renderMixin(Vue) {
  Vue.prototype._c = function(...args) { // 元素节点
    return createElement(this,...args)
  }
  Vue.prototype._v = function(text) { // 文本节点
    return createTextVnode(this,text)
  }
  Vue.prototype._s = function(val) { // 转换为字符串
    return val == null? '' : (typeof val === 'object' )? JSON.stringify(val) : val
  }
  // 调用render函数 生成vnode
  Vue.prototype._render = function() {
    const vm = this
    let render = vm.$options.render // 获取编译后的render
    let vnode = render.call(this) // 调用render 获取vnode
    return vnode
  }
}