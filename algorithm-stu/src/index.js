import Graph from "./structure/graph/index"

// 图 相关测试
const matrix = [
  [5, 0, 1],
  [4, 2, 3],
  [3, 1, 2],
  [1, 0, 2]
]
const graph = Graph.createGraph(matrix)
console.log(graph)
