import { initState } from './state'
import { compileToFunction } from './compiler/index.js'
import { callHook, mountComponent } from'./lifecycle'
import { megerOptions, nextTick } from "./util/index";

export function initMixin(Vue) {
  Vue.prototype._init = function(options) { // 用户传入的对象
    const vm = this 
    // Vue.options 是mixin的
    // 合并两者
    // vm.$options = options'
    vm.$options = megerOptions(vm.constructor.options, options)
    callHook(vm, 'beforeCreate')
    // 初始化状态
    initState(vm)
    callHook(vm, 'created')
  
    // 如果用户传入了el属性，需要将页面渲染， 实现挂载
    if(vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$nextTick = nextTick

  Vue.prototype.$mount = function(el) {
    const vm = this
    const options = vm.$options
    el = el && document.querySelector(el)
    vm.$el = el
    // 渲染顺序：默认查找render 然后采用template el下的outerHTML
    if(!options.render) {
      let template = options.template
      if(!template && el) {
        // 去 el下的outerHTML
        template = el.outerHTML
      } 
      // template ==> AST ==> render方法
      const render = compileToFunction(template)
      options.render = render
    }

    // 组件挂载
    mountComponent(vm)
  }
}