// 前缀树的节点

export default class TrieNode {
  constructor () {
    // 节点经过了多少次
    this.pass = 0
    // 作为结束节点了多少次
    this.end = 0
    // 下级路
    this.nets = []
  }
}