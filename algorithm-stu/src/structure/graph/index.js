import Edge from "./edge"
import Node from "./node"

export default class Graph {
  constructor () {
    // 点
    this.nodes = new Map()
    // 边
    this.edges = new Set()
  }

  // n*3的矩阵 变成图
  // weight from to
  static createGraph (matrix) {
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
      fromNode.nexts.push(toNode)
      fromNode.edges.push(edge)
      fromNode.out++
      toNode.in++
      graph.edges.add(edge)
    } 
    return graph
  }
}