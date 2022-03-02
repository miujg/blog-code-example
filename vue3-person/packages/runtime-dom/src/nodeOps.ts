export const nodeOps = {
  // createElement, 不同的平台创建元素方式不同 (此处只增对浏览器)
  createElement: tagName => document.createElement(tagName),
  remove: child => {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  // anchor参照物
  insert: (child, parent, anchor) => {
    // 参照物为空 === appendChild
    parent.insertBefore(child, anchor)
  },
  querySelector: selector => document.querySelector(selector),
  // 给元素设置内容
  setElementText: (el, text) => el.textContent = text,
  // ----文本操作----
  createText: text => document.createTextNode(text),
  setText: (node, text) => node.nodeValue = text,
  // 获取一个节点的下一个节点
  nextSibling: (node:HTMLElement) => node.nextSibling 
}