import Edge from "./edge"
import Node from "./node"
import Queue from "../queue"
import Stack from '../stack'

export default class Graph {
  constructor () {
    // 点
    this.nodes = new Map()
    // 边
    this.edges = new Set()
  }

  getNode (val) {
    return this.nodes.get(val)
  }

  // n*3的矩阵
  // 矩阵格式： weight from to
  static createGraph (matrix, isDirection = true) {
    const graph = new Graph()
    for (let i = 0; i < matrix.length; i++) {
      const weight = matrix[i][0]
      const from = matrix[i][1]
      const to = matrix[i][2]
      if (!graph.nodes.has(from)) {
        graph.nodes.set(from, new Node(from))
      }
      if (!graph.nodes.has(to)) {
        graph.nodes.set(to, new Node(to))
      }
      const fromNode = graph.nodes.get(from)
      const toNode = graph.nodes.get(to)
      const edge = new Edge(weight, fromNode, toNode)
      if (!isDirection) {
        // 无向图 生成一条反方向边
        const edge = new Edge(weight, toNode, fromNode)
        toNode.nexts.push(fromNode)
        toNode.edges.push(edge)
        toNode.out++
        fromNode.in++
        graph.edges.add(edge)
      }
      fromNode.nexts.push(toNode)
      fromNode.edges.push(edge)
      fromNode.out++
      toNode.in++
      graph.edges.add(edge)
    } 
    return graph
  }

  // 宽度/广度优先
  static bfc (head) {
    const queue = new Queue()
    const set = new Set()
    queue.add(head)
    while (!queue.isEmpty()) {
      const cur = queue.poll()
      console.log(cur)
      // 处理cur.nexts
      cur.nexts.forEach(node => {
        if (!set.has(node)) {
          set.add(cur)
          queue.add(node)
        }
      })
    }
  }

  // 深度优先
  static dfc (head) {
    const stack = new Stack()
    const set = new Set()
    stack.push(head)
    while (!stack.isEmpty()) {
      const cur = stack.pop()
      if (!set.has(cur)) {
        set.add(cur)
        console.log(cur)
      } 
      for (let i = 0; i < cur.nexts.length; i++) {
        const curNext = cur.nexts[i]
        if (!set.has(curNext)) {
          stack.push(cur)
          stack.push(curNext)
          break
        }
      }
    }
  }

  // 拓扑排序
  static topology (graph) {
    const head = getZeroinNode(graph)
    const zeroInArray = [head]
    const inMap = new Map()
    function initMap () {
      
    }
    // 获取图中入度为0的节点
    function getZeroinNode (graph) {
      const nodes = graph.nodes
      for (let key of nodes.keys()) {
        const curNode = nodes.get(key)
        if (curNode.in === 0) return curNode
      }
    }
  }
}