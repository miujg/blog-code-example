import { isArray, isObject } from "@vue/shared"
import { createVNode, isVnode } from "./vnode"

// h就是兼容一些写法最终调用createVNode
export function h(type, propsOrChildren, children) {
  const l = arguments.length
  // 类型 + 属性  类型 + 孩子
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren) ) {
      // 第二个参数是对象
      // 判断第二个参数是不是vnode h('div', h('span'))
      if (isVnode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren])
      }
      // 就是属性
      return createVNode(type, propsOrChildren)
    } else {
      // 如果第二个参数不是对象 那一定是孩子(或者孩子们--》数组的话)
      return createVNode(type, {}, propsOrChildren)
    }
  } else {
    // return createVNode(type, propsOrChildren, children)
    if(l > 3) {
      //  h('div', {}, p, span)
      children = Array.prototype.slice.call(arguments, 2)
    } else if (l === 3 && isVnode(children)) {
      children = [children]
    } 
    return createVNode(type, propsOrChildren, children)
  }
}