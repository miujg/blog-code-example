
import Watcher from './observe/watcher'
export function mountComponent(vm, el) {
  // vue是通过watcher 来进行渲染 渲染过程 每一个组件都有一个渲染watcher
  new Watcher()
}