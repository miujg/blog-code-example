import { isReservedTag, isObject } from "../util/index"

export function createElement(vm, tag, data={}, ...children) {
  // 需要对标签名做过滤 因为标签名有可能是一个自定义组件
  if(isReservedTag(tag)) {
    return vnode(vm, tag, data, data.key, children, undefined)
  } else {
    // 自定义组件
    const Ctor = vm.$options.components[tag] // 对象或元素
    // 组件的核心 Vue.extend
    return createComponent(vm, tag, data, data.key, children, Ctor)
  }
}

function createComponent(vm, tag, data, key, children, Ctor) {
  if(isObject(Ctor)) {
    Ctor = vm.$options._base.extend(Ctor)
  }
  // 给组件增加生命周期
  data.hook = {
    // 初始化钩子
    init(vnode) {
      // 对组件进行了实例化，调用子组件的
      let child = vnode.componentInstance = new vnode.componentOptions.Ctor({})
      child.$mount() // 手动挂载
    }
  }
  // 组件的虚拟节点 拥有hook componentOptions（存放组件的构造函数）
  return vnode(vm, `vue-component-${Ctor.cid}-${tag}`, data, key, undefined, undefined, {Ctor})
}

export function createTextVnode(vm, text) { 
  return vnode(vm, undefined, undefined, undefined, undefined, text)
}

// key
function vnode(vm, tag, data, key, children, text, componentOptions) {
  return {
    vm,
    tag,
    children,
    data,
    key,
    text,
    componentOptions
  }
}

export function isSameVnode(oldVnode, newVnode) {
  return (oldVnode.tag === newVnode.tag) && (oldVnode.key === newVnode.key)
}