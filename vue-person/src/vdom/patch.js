import { isSameVnode } from "./index"
import { isReservedTag } from "../util/index"

export function patch(oldVnode, vnode) {
  // old是一个真实dom
  if(!oldVnode) {
    // 根据虚拟节点创建元素
    return createElm(vnode)
  }
  // 首次渲染 产生真实节点
  // 真实element有一个nodeType 1表示元素节点 2表示属性节点
  const isRealElement = oldVnode.nodeType
  if(isRealElement) {
    // 初次渲染
    const oldElm = oldVnode
    const parentElm = oldElm.parentNode

    let el = createElm(vnode) // 根据虚拟节点创建真实节点
    parentElm.insertBefore(el, oldElm.nextSibling) // 将生成的el放到oldElm下一个的前面 === oldElm的后面(这个更好理解)
    // 移除oldElm
    parentElm.removeChild(oldElm)
    return el
  } else {
    // diff算法 两个虚拟节点对比
    // 1.如果标签（tag）不一致 直接替换
    if(oldVnode.tag !== vnode.tag) {
      // 直接dom操作 不算diff算法
      return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el)
    }

    // 2.标签一样但是是两个文本元素(tag: undefined, text),对比text
    if(!oldVnode.tag) {
      // 标签相同 一定是文本
      if(oldVnode.text !== vnode.text) {
        return oldVnode.el.textContent = vnode.text
      }
    }

    // 3. 元素相同， 复用老节点 更新属性
    let el = vnode.el = oldVnode.el
    // 用老的属性和新的虚拟节点进行比对
    updateProperties(vnode, oldVnode.data)

    // 4. tag一样属性更新之后， 更新儿子
    let oldChildren = oldVnode.children || []
    let newChildren = vnode.children || []
    if(oldChildren.length > 0 && newChildren.length > 0) {
      // a. 老的新的都有儿子  dom-diff(核心)
      updateChildren(el, oldChildren, newChildren)
    } else if(oldChildren.length > 0) {
      // b. 老的有儿子，新的没儿子 =》 删除老儿子
      el.innerHTML = ''
    } else if(newChildren.length > 0) {
      // c. 新的有儿子 老的没儿子 =》 在老节点上增加儿子即可
      newChildren.forEach(child => el.appendChild(createElm(child)))
    }

  }
}

// 自定义组件渲染
function createComponent(vnode) {
  let i = vnode.data
  if((i = i.hook) && (i = i.init)) {
    i(vnode) // 执行完之后产生真实dom ==》 vnode.componentInstance
  }
  if(vnode.componentInstance) {
    return true
  }
  return false
}

// 通过vnode创建真实节点
export function createElm(vnode) {
  let { tag, children, key, data, text, vm } = vnode
  // 可能是自定义组件
  if(typeof tag === 'string') {
    if(createComponent(vnode)) {
      // 如果返回true 虚拟节点是组件
      // 如果是组件，就将组件渲染后的真实元素给我
      return vnode.componentInstance.$el
    }

    vnode.el = document.createElement(tag) // 之所以会挂载，是方便指令的时候拿到真实dom
    // 更新属性
    updateProperties(vnode) 
    children.forEach(child => {
      vnode.el.appendChild(createElm(child))
    })
  } else {
    // 文本节点
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

// dom-diff 双指针
function updateChildren(parent, oldChildren, newChildren) {
  let oldStartIndex = 0 //老的头索引
  let oldEndIndex = oldChildren.length - 1 // 老的尾索
  let oldStartVnode = oldChildren[0] // 老的开始节点
  let oldEndVnode = oldChildren[oldEndIndex] //老的结束节点
  
  let newStartIndex = 0 //新的头索引
  let newEndIndex = newChildren.length - 1 // 新的尾索
  let newStartVnode = newChildren[0] // 新的开始节点
  let newEndVnode = newChildren[newEndIndex] //新的结束节点

  while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 1. 前端中比较常见的操作： 尾部插入 头部插入 头移动到尾部 尾部移动到头部 正序和反序
    if(isSameVnode(oldStartVnode, newStartVnode)) {
      // 向后插入（针对与newchild） 从头开始比
      // 比较属性 更新属性 递归
      patch(oldStartVnode, newStartVnode)
      oldStartVnode = oldChildren[++oldStartIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else if(isSameVnode(oldEndVnode, newEndVnode)) {
      // 向前插入 从尾开始比
      patch(oldEndVnode, newEndVnode)
      oldEndVnode = oldChildren[--oldEndIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if(isSameVnode(oldStartVnode, newEndVnode)) {
      // 比较老头新尾 
      // 头移动到尾
      patch(oldStartVnode, newEndVnode)
      // dom操作具备移动性 dom映射
      parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling)
      oldStartVnode = oldChildren[++oldStartIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if(isSameVnode(oldEndVnode, newStartVnode)) {
      // 比较老尾新头
      patch(oldEndVnode, newStartVnode)
      parent.insertBefore(oldEndVnode.el, oldStartVnode.el)
      oldEndVnode = oldChildren[--oldEndIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else {
      // 乱序


    }
    // 为什么v-for要增加key属性（dom diff）？key不能用index（理解， 反序产场景）
  }
  if(newStartIndex <= newEndIndex) { // 新的比老的多 ，多的插入到老的后面 或者前面
    for(let i = newStartIndex; i <= newEndIndex; i++) {
      // 向前插入 向后插入
      // 判断尾指针 动了尾指针。如果动了尾指针，则下一个有值（像前插入）。如果没动尾指针，下一个没值
      let nextEle = newChildren[newEndIndex + 1] == null? null : newChildren[newEndIndex+1].el
      // insertBefore 的第二个参数为null 等价于 appendChild
      parent.insertBefore(createElm(newChildren[i]), nextEle)
    }
  }




}

function updateProperties(vnode, oldProps = {}) {
  let newProps = vnode.data || {}
  let el = vnode.el

  // 1.老的属性， 新的没有 删除属性
  for(let key in oldProps) {
    if(!newProps[key]) {
      el.removeAttribute(key)
    }
  }

  // 2. 新的属性，老的没有 直接用新的覆盖 不考虑有没有
  for(let key in newProps) {
    el.setAttribute(key, newProps[key])
  }
}