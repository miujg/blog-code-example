import Queue from "./queue"
import Stack from "./stack"

// 数节点
export class Node {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

// 二叉树类
export class Three {
  constructor() {
    this.root = null
  }
  // 插入节点
  insert (val) {
    if (this.root == null) {
      const newNode = new Node(val)
      this.root = newNode
    } else {
      this.insertNode(this.root, val)
    }
  }
  // 按宽度遍历
  insertNode (root, val) {
    const queue = new Queue()
    queue.add(root )
    while(!queue.isEmpty()) {
      const curNode = queue.poll()
      if (curNode.left) {
        queue.add(curNode.left)
      } else {
        curNode.left = new Node(val)
        break
      }
      if (curNode.right) {
        queue.add(curNode.right)
      } else {
        curNode.right = new Node(val)
        break
      }
    }
  }
  // 先序递归
  preOrderTraverse (node) {
    if (node == null) return
    console.log(node)
    this.preOrderTraverse(node.left)
    this.preOrderTraverse(node.right)
  }
  // 先序迭代
  preOrderTraverseIteration (node) {
    if (node == null) return
    const queue = new Queue()
    queue.add(node)
    while (!queue.isEmpty()) {
      const curNode = queue.poll()
      console.log(curNode)
      if (curNode.right) queue.add(curNode.right)
      if (curNode.left) queue.add(curNode.left)
    }
  }
  // 中序递归
  inOrderTraverse(node) {
    if (node == null) return
    this.inOrderTraverse(node.left)
    console.log(node)
    this.inOrderTraverse(node.right)
  }
  // 中序迭代
  inOrderTraverseIteration (node) {
    if(node == null) return
    const stack = new Stack()
    while (node != null || !stack.isEmpty()) {
      if (node != null) {
        stack.push(node)
        node = node.left
      } else {
        node = stack.pop()
        console.log(node)
        node =  node.right
      }
    }
  }
  // 后序递归
  postOrderTraverse(node) {
    if (node  == null) return
    this.postOrderTraverse(node.left)
    this.postOrderTraverse(node.right)
    console.log(node)
  }
  // 后续迭代
  postOrderTraverseIteration (node) {
    if (node == null) return
    const stack = new Stack()
    const stack1 = new Stack()
    stack.push(node)
    while(!stack.isEmpty()) {
      const curNode = stack.pop()
      stack1.push(curNode)
      if (curNode.left) stack.push(curNode.left)
      if (curNode.right) stack.push(curNode.right)
    }
    while(!stack1.isEmpty()) {
      console.log(stack1.pop())
    }

  }
  // 获取最大宽度
  // hash + 宽度遍历
  getMaxwidth(head) {
    if (head == null) return -1
    // 最大宽度
    let max = 0
    // 当前所在层级
    let curLeavel = 0
    // 当前层级的宽度
    let curLeavelNum = 0
    const map = new Map()
    const queue = new Queue()
    queue.add(head)
    map.set(head, 0)
    while (!queue.isEmpty()) {
      head = queue.poll()
      console.log(head)
      if (curLeavel !== map.get(head)) {
        // 进入下一层级了
        max = Math.max(max, curLeavelNum)
        curLeavel = curLeavel + 1 
        curLeavelNum = 1
      } else {
        curLeavelNum = curLeavelNum + 1
      }
      if (head.left) {
        map.set(head.left, map.get(head) + 1)
        queue.add(head.left)
      }
      if (head.right) {
        map.set(head.right, map.get(head) + 1)
        queue.add(head.right)
      }
    }
    return Math.max(max, curLeavelNum)
  }
  // 根据数组创建二叉树
  createThreeByArr(arr) {
    arr.forEach(val => this.insert(val))
  }
  // 获得头节点
  getRoot () {
    return this.root
  }
}
