import { initState } from './state'
import { compileToFunction } from './compiler/index.js'

export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this 
    vm.$options = options
    
    // 初始化状态
    initState(vm)
  
    // 如果用户传入了el属性，需要将页面渲染， 实现挂载
    if(vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function(el) {
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)
    // 渲染顺序：默认查找render 然后采用template el下的outerHTML

    if(!options.render) {
      let template = options.template
      if(!template && el) {
        // 去 el下的outerHTML
        template = el.outerHTML
        // template ==> render方法 
        const render = compileToFunction(template)
        options.render = render
      } 
    } else {

    }
  }
}