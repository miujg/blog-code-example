
import Watcher from './observe/watcher'

export function lifecycleMixin(Vue) {
  // vnode 转换为真实dom
  Vue.prototype._update = function(vnode) {
    console.log(vnode)
  }
}

export function mountComponent(vm, el) {
  // vue是通过watcher 来进行渲染 渲染过程 每一个组件都有一个渲染watcher

  let updateComponent = () => {
    // update 虚拟dom =>真实dom
    vm._update(vm._render())
  }

  new Watcher(vm, updateComponent, () => {

  }, {})


}