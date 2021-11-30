
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


    // 1. 第一次 初始化 第二次 diff 算法
    const prevVnode = vm._vnode // 先取上一次的vnode
    vm._vnode = vnode // 保存上一次的虚拟节点
    if(!prevVnode) {
      // 初渲染
      vm.$el = patch(vm.$el, vnode)
    } else {
      vm.$el = patch(prevVnode, vnode)
    }
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
  // true表示渲染watcher 其他是用户watcher 如： watch
  // 直接进行第一次渲染
  new Watcher(vm, updateComponent, () => {
    
  }, true)

}