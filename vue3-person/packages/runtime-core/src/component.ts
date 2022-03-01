import { isFunction, isObject, ShapeFlags } from "@vue/shared"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"

// 根据虚拟dom创建组件实例
export const createComponentInstance = (vnode) => {
  const instance = {
    vnode,
    type: vnode.type, // 并不太语义化 组件的type 就是 component对象。 元素的type 就是 'div'
    attrs: {}, // $attrs
    slots: {}, // props
    ctx: {},
    render: null,
    isMounted: false, // 标识组件是否挂载,
    // vnode.props 包含 props + attrs
    props: {}, 
    setupState: {name: 'setupState'}, // setup如果返回对象，就是这个对象
    data: {name: 'data'}  // vue2的那个data
  }
  // 上下文 用于代理 而不是代理源对象
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

  // 获取组件类型 拿到组件的setup方法
  const Component = instance.type
  let  { setup } = Component
  // 代理proxy传给render
  // proxy 可以拿到setup props data
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers as any)
  if (setup) {
    // 给setup传参
    // 创建上下文 并不等于组件实例
    const setupContext = createSetupContext(instance)
    // 可能是对象 也可能是函数
    const setupResult = setup(instance.props, setupContext)
    handleSetupResult(instance, setupResult)
  } 
  finishComponentSetup(instance)
}

function handleSetupResult(instance, setupResult) {
  if (isFunction(setupResult)) {
    // 组件的render方法
    instance.render = setupResult
  } else if(isObject(setupResult)) {
    instance.setupState = setupResult
  }
}

function createSetupContext(instance) {
  // 为什么不能直接用instance, 过滤一些东西。 
  return {
    attrs: instance.attrs,
    slots: instance.slots,
    emit: () => {},
    // 暴露组件的方法
    expose: () => {}
  }
}

function finishComponentSetup(instance) {
  const Component = instance.type
  if (!instance.render) {
    if (Component.render && Component.template) {
      // 对template进行编译 产生render函数
      // 将生成的render函数放在实例上
      // todo

    }
    // 编译好之后赋值给instance
    instance.render = Component.render
  }
  // 对vue2.0api兼容处理   todo

}
