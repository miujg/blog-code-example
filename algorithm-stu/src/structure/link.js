/**
 * 链表
 */

// 链表与数组对比
// 1. 数组是内存内连续的一段空间， 链表不连续通过next指针链接在一起
// 2. 数组的增删比较复杂，涉及扩容、数组项移动. 链表更友好，扩容，新增都很容易
// 3. 数组查找比较方便, 链表必须从头开始查找。

export class Node {
  constructor (element) {
    this.element = element
    this.next = undefined
    this.random = null
  }
}


export default class LinkedList {
  constructor() {
    this.count = 0
    this.head = undefined
  }

  getHead () {
    return this.head
  }

  // 为空插入head 不为空插入尾元素
  push (element) {
    const node  = new Node(element)
    let current;
    if (this.head == null) {
      this.head = node
    } else {
      current = this.head
      while (current.next != null) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }

  /**
   * 
   * @param {*} element 节点
   * @param {*} index 位置
   */
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      if (index === 0) {
        node.next = this.head
        this.head = node
      } else {
        let current = this.getElementAt(index)
        let nextNode = current.next
        current.next = node
        node.next = nextNode
      }
      this.count++
    }
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
  }

  remove(element) {
    const index = this.indexOf(element)
    let current
    if (index < 0) {
      return -1
    } else if (index === 0) {
      current = this.head
      this.head = current.next
    } else {
      const prev = this.getElementAt(index - 1)
      current = prev.next
      prev.next = current.next
    }
  }

  indexOf (element) {
    let current = this.head
    for (let i = 0; i < this.count && current != null; i++) {
      if (element === current.element) return i
      current = current.next
    }
    return -1
  }

  removeAt(position) {
    if (position >= 0 || position <= this.count - 1) {
      let current = this.head
      if (position === 0) {
        this.head = current.next
      } else {
        let prev = this.getElementAt(position - 1)
        current = prev.next
        prev.next = current.next 
      }
      this.count--
    }
  }

  isEmpty() {
    return this.count === 0
  }

  size() {
    return this.count
  }

  toString(head = this.head) {
    let current = head
    let arr = []
    while (current != null) {
      arr.push(current.element)
      current = current.next
    }
    return arr.join(',')
  }
}


// 参考资料 js的内存管理机制，垃圾回收: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management


