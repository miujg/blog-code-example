import { ShapeFlags } from "@vue/shared"

// 根据虚拟dom创建组件实例
export const createComponentInstance = (vnode) => {
  const instance = {
    vnode,
    type: vnode.type,
    // vnode.props 包含 props + attrs
    props: {}, 
    attrs: {}, // $attrs
    slots: {}, // props
    setupState: {}, // setup如果返回对象，就是这个对象
    ctx: {},
    render: null,
    isMounted: false // 标识组件是否挂载
  }
  // 上下文
  instance.ctx = { _: instance }
  return instance
}

// 执行setup将数据挂载到实例上
export const setupComponent = (instance) => {
  const {props, children, type} = instance.vnode

  // 根据props 解析出 props  和 attrs。 initProps (todo)
  instance.props = props
  // 插槽的解析 initSlot(todo)
  instance.childred = children
  // 需要拿到type里面的setup

  const isStateful =  instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT
  if (isStateful) { // 一个带状态的组件
    // 调用当前实例的setup返回值
    setupStatefulComponent(instance)
  }
}

function setupStatefulComponent(instance) {
  // 1.代理 todo

  // 2. 获取组件类型 拿到组件的setup方法
  const {setup} = instance.type 
}
