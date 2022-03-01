import { isArray, isObject, isString } from "@vue/shared"
import { ShapeFlags } from '@vue/shared'

export function isVnode(vnode) {
  return vnode.__v_isVnode
}

// h('div', {style: {}}, childred)
export const createVNode = function(type, props, childred?) {
  // 判断是元素还是组件

  const shapeFlag = isString(type)? 
    ShapeFlags.ELEMENT : isObject(type)?
    ShapeFlags.STATEFUL_COMPONENT : 0 

  // 给虚拟节点加一个类型
  const vnode = { // 虚拟节点跨平台
    __v_isVnode: true, // 是不是vnode
    type,
    props,
    childred,
    component: null, // 存放组件对应的实例
    el: null, // 虚拟节点与真实节点对应
    key: props && props.key, //diff
    shapeFlag // 身份
  }
  // 描述自己和儿子的类型（联合类型）
  normalizeChildren(vnode, childred)
  return vnode
}

function normalizeChildren(vnode, childred) {
  let type = 0
  // 不对儿子进行处理
  if (childred == null) {

  } else if (isArray(childred)) {
    type = ShapeFlags.ARRAY_CHILDREN
  } else {
    type = ShapeFlags.TEXT_CHILDREN
  }
  // 联合类型
  vnode.shapeFlag |= type
}

export const Text = Symbol('Text')
// 文本转换为 文本对应的vnode
export function normalizeVNode (child) {
  if (isObject(child)) return child
  return createVNode(Text, null, String(child))
}