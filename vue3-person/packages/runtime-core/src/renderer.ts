import { ShapeFlags } from '@vue/shared'
import { createAppAPI } from './apiCreateApp'
import { createComponentInstance, setupComponent } from './component'

// 接受不同平台的rendererOptions
// 创建不同的渲染器
export function createRenderer(rendererOptions) {
  const setupRenderEffect = (instance) => {}
  const mountComponent = (initialVNode, container)  => {
    // 核心  调用setup拿到返回值， 使用render，进行渲染
    // 1. 先实例
    // 根据虚拟dom创建组件实例
    const instance = initialVNode.component = createComponentInstance(initialVNode)
    // 2. 需要的数据解析到实例上
    setupComponent(instance)
    // 3. 创建一个effect 让render执行
    setupRenderEffect(instance)
  }

  const processComponent = (n1, n2, container) => {
    if (n1 == null) { // 没有上一次节点 初次渲染
      mountComponent(n2, container)
    } else {
      // 组件更新
    }
  }

  const patch = (n1, n2, container) => {
    // 不同类型，做初始化操作
    const  {shapeFlag}  = n2
    if (shapeFlag & ShapeFlags.ELEMENT) {
      console.log('元素')
    } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
      console.log('组件')
      processComponent(n1, n2, container)
    }

  }

  const render = (vnode, container) => {
    // core根据不同的虚拟节点，创建不同的真实元素
    patch(null, vnode, container)
  }

  return {
    createApp: createAppAPI(render) 
  }
}

// 组件 ==》 虚拟dom ==》 真实dom ==》 挂载

