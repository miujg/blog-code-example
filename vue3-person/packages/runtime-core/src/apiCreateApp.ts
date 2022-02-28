import { createVNode } from "./vnode"


export function createAppAPI(render) {
  return function createApp (rootComponent, rootProps) { // 告诉他哪个组件哪个属性来创建应用
    const app = {
      _props: rootProps,
      _conponent: rootComponent,
      _container: null,
      mount(container) { // 挂载目的地
        // 根据组件创建虚拟dom
        // 使用render方法渲染渲染

        // 创建虚拟节点
        const vnode = createVNode(rootComponent, rootProps)
        // 渲染
        render(vnode, container)
        app._container = container
        
      }
    }
    return app
  }
}