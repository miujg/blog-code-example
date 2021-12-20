export default class Node {
  constructor (value) {
    this.value = value
    // 多少个出度
    this.in = 0
    // 多少个入度
    this.out = 0
    // 出去的节点
    this.nexts = []
    // 拥有的边
    this.edges = []
  }
}