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

// 普通二叉树类
// 满二叉树 完全二叉树
export class Three {
  constructor() {
    this.root = null
  }

  /**
   * 根据val 插入值
   * @param {*} targetVal 树种的值
   * @param {*} insertVal 插入的值
   * @param {*} position right or left
   */
  insertByVal (targetVal, insertVal, position) {
    const node = this.root
    if(node == null) return
    const queue = new Queue()
    queue.add(node)
    while(!queue.isEmpty()) {
      const curNode = queue.poll()
      if (curNode.val == targetVal && !curNode[position]) {
        curNode[position] = new Node(insertVal)
        break
      } 
      if (curNode.left) {
        queue.add(curNode.left)
      }
      if (curNode.right) {
        queue.add(curNode.right)
      }
    }
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
    console.log(node.val)
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
  // 是否是二叉搜索树
  isBST (node) {
    let preVal = Number.MIN_VALUE
    // 如果是二叉搜索树，中序遍历一定有序且递增
    function checkBST(node) {
      if (node == null) return true
      let isLeftBst = checkBST(node.left)
      if (!isLeftBst) {
        return false
      } 
      // 这里进行对比
      if (preVal < node.val) {
        preVal = node.val
      } else {
        return false
      }
      return checkBST(node.right)
    }
    return checkBST(node)
  }
  // 用树型Dp的方式判断是否是二叉搜索树
  isBSTDp (node) {
    return process(node).isBs

    function process(node) {
      if (node == null) return null
      let leftData = process(node.left)
      let rightData = process(node.right)

      let min = node.val
      let max = node.val
      let isBs = true

      if (leftData != null) {
        max = Math.max(max, leftData.max)
        min = Math.min(min, leftData.min)
      }
      if (rightData != null) {
        max = Math.max(max, rightData.max)
        min = Math.min(min, rightData.min)
      }

      if (leftData != null &&  ( !leftData.isBs || node.val <= leftData.max)) {
        isBs = false
      }
      if (rightData != null && ( !rightData.isBs || node.val >= rightData.max)) {
        isBs = false
      }

      return {max, min, isBs}

    }
  }
  // 是否是满二叉树
  // 宽度遍历
  isCBT(node) {
    return process(node).isCb
    // num heihgt isbc
    function process(node) {
      if(node == null) return {num: 0, height: 0, isCb: true}

      let leftData = process(node.left)
      let rightData = process(node.right)

      let num = leftData.num + rightData.num + 1
      let height = Math.max(leftData.height, rightData.height) + 1
      let isCb = true
      // if (leftData.num > 0 && leftData.num !== (Math.pow(2,leftData.height) - 1)) isCb = false
      // if (rightData.num > 0 && rightData.num !== (Math.pow(2,rightData.height) - 1)) isCb = false
      if (num !== (Math.pow(2, height) - 1)) isCb = false
      return {num, height, isCb}
    }
  }
  // 判断满二叉树

  // 判断平衡二叉树
  // 通过 树形DP的思想
  isBanlanced(node) {
    return process(node).isBalance

    function process (node) {
      if (node == null) return {height: 0, isBalance: true}

      const leftData = process(node.left)
      const rightData = process(node.right)
      let height = Math.max(leftData.height, rightData.height) + 1
      let isBalance = leftData.isBalance && rightData.isBalance && Math.abs(leftData.height - rightData.height) < 2
      return {isBalance, height}
    }
  }

}

// 二叉搜索树
export class BSTThree extends Three {
  constructor() {
    super()
  }

  insert(val) {
    if (this.root == null) {
      this.root = new Node(val)
    } else {
      this.insertNode(this.root, val)
    }
  }

  insertNode(node, val) {
    if (node == null) {
      return
    }
    if (val <= node.val) {
      if (node.left != null) {
        this.insertNode(node.left, val)
      } else {
        node.left = new Node(val)
        return
      }
    } else {
      if (node.right != null) {
        this.insertNode(node.right, val)
      } else {
        node.right = new Node(val)
        return
      }
    }
  }

}