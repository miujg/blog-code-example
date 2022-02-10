import Graph from "./structure/graph/index"

// 图 相关测试
const matrix = [
  [5, 0, 1],
  [4, 2, 3],
  [3, 1, 2],
  [1, 0, 2]
]
// 有向图
const dirGraph = Graph.createGraph(matrix)
// console.log(dirGraph)

// 无向图
const matrix1 = [
  [1, 1, 2],
  [2, 2, 3]
]

const undirGraph = Graph.createGraph(matrix1, false)
// console.log(undirGraph)

// 广度/深度优先遍历
const matrix2 = [
  [1, 'A', 'B'],
  [1, 'A', 'C'],
  [1, 'A', 'D'],
  [1, 'B', 'F'],
  [1, 'D', 'E'],
  [1, 'F', 'G'],
]

const graphFc = Graph.createGraph(matrix2, false)
// Graph.bfc(graphFc.getNode('A'))
// Graph.dfc(graphFc.getNode('A'))

// 拓扑排序

const matrix3 = [
  [1, 'V1', 'V2'],
  [1, 'V1', 'V3'],
  [1, 'V2', 'V3'],
  [1, 'V2', 'V4'],
  [1, 'V3', 'V4'],
]

const graphTp = Graph.createGraph(matrix3)
Graph.topology(graphTp)

// 最小生成树
// k算法
// p算法