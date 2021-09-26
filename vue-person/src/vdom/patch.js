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
      if(oldVnode.text !== oldVnode.text) {
        return oldVnode.el.textContent = vnode.text
      }
    }

    // 3. 元素相同， 复用老节点 更新属性
    let el = vnode.el = oldVnode.el
    // 用老的属性和新的虚拟节点进行比对
    updateProperties(vnode, oldVnode.data)
  }
}

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