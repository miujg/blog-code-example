export default class Edge {
  constructor (weight, from, to) {
    // 边的起点
    this.from = from
    // 边的终点
    this.to = to
    // 边的权重
    this.weight = weight
  }
}