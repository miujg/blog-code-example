
import Watcher from './observe/watcher'
import { patch } from './vdom/patch'
export function lifecycleMixin(Vue) {
  // vnode 转换为真实dom
  Vue.prototype._update = function(vnode) {
    // 将虚拟节点转换为真实dom
    let vm = this 
    // 首次渲染 需要用虚拟dom创建真实的dom元素
    // 第一次渲染完毕之后，拿到新的节点，下次再次渲染替换上次的结果
    // 组件调用之后产生真实dom
    vm.$el = patch(vm.$el, vnode)
  }
}

// 调用生命周期 发布
export function callHook(vm, hook) {
  const handles = vm.$options[hook]
  if(handles) {
    // 生命周期为什么不能是箭头函数？
    handles.forEach(handler => handler.call(vm))
  }
}

export function mountComponent(vm) {
  // vue是通过watcher 来进行渲染 渲染过程 每一个组件都有一个渲染watcher

  let updateComponent = () => {
    // update 虚拟dom =>真实dom
    vm._update(vm._render())
  }

  new Watcher(vm, updateComponent, () => {
    
  }, {})

}