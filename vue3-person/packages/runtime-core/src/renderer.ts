import { effect } from '@vue/reactivity'
import { ShapeFlags } from '@vue/shared'
import { createAppAPI } from './apiCreateApp'
import { createComponentInstance, setupComponent } from './component'
import { queueJob } from './scheduler'
import { normalizeVNode, Text } from './vnode'

// 接受不同平台的rendererOptions
// 创建不同的渲染器
export function createRenderer(rendererOptions) {

  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    // createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
  } = rendererOptions

  // 创建一个effect， 在effect调用render 
  // render中拿到的数据会搜集这个effect
  // 数据更新 effect重新执行
  const setupRenderEffect = (instance, container) => {
    // 每个组件有一个effect（组件级更新）
    effect(function componentEffect() {
      // 初次渲染
      if(!instance.isMounted) {
        const proxyToUse = instance.proxy
        // 组件vnode 组件的内容 subTree 对应vue的 $vnode _vnode
        const subTree = instance.subTree = instance.render.call(proxyToUse, proxyToUse)
        patch(null, subTree, container)
        instance.isMounted = true
      } else {
        // 更新逻辑
        console.log('update')
      }
    }, {
      scheduler: (effect) => queueJob(effect)
    })
  }
  const mountComponent = (initialVNode, container)  => {
    // 核心  调用setup拿到返回值， 使用render，进行渲染
    // 1. 先实例
    // 根据虚拟dom创建组件实例
    const instance = initialVNode.component = createComponentInstance(initialVNode)
    // 2. 需要的数据解析到实例上
    setupComponent(instance)
    // 3. 创建一个effect 让render执行
    setupRenderEffect(instance, container)
  }

  const processComponent = (n1, n2, container) => {
    if (n1 == null) { // 没有上一次节点 初次渲染
      mountComponent(n2, container)
    } else {
      // 组件更新
    }
  }

  // -------^^^^^^^组件………………

  // --------- 元素
  const mountChildren = (children, container) => {
    for (let i = 0; i < children.length; i++) {
      // 如果是文本节点 将其准换为文本节点对应的虚拟节点
      const child = normalizeVNode(children[i])
      patch(null, child, container)
    }
  }
  const mountElement = (vnode, container) => {
    // 递归渲染
    const { props, shapeFlag, type, childred } = vnode
    const el = (vnode.el = hostCreateElement(type))
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }
    hostInsert(el, container)
    // children是文本
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      hostSetElementText(el, childred)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 开始递归
      console.log('数组')
      mountChildren(childred, el)
    }
  }

  const processElement = (n1, n2, container) => {
    if (n1 == null) {
      mountElement(n2, container)
    }
  }

  // ------ 文本
  const processText = (n1, n2, container) => {
    if (n1 == null) {
      hostInsert((n2.el = hostCreateText(n2.childred)), container)
    }
  }

  const patch = (n1, n2, container) => {
    // 不同类型，做初始化操作
    const  {shapeFlag, type}  = n2
    switch (type) {
      // 文本节点
      case Text:
        processText(n1, n2, container)
        break
      default:  
        if (shapeFlag & ShapeFlags.ELEMENT) {
          console.log('元素')
          processElement(n1, n2, container)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          console.log('组件')
          processComponent(n1, n2, container)
        }
    }
  }

  const render = (vnode, container) => {
    // core根据不同的虚拟节点，创建不同的真实元素
    // 初次渲染的时候
    patch(null, vnode, container)
  }

  return {
    createApp: createAppAPI(render)
  }
}

// 组件 ==》 虚拟dom ==》 真实dom ==》 挂载

