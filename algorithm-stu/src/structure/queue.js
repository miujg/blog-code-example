export default class Queue {
  constructor(arr) {
    this.arr = arr || []
  }

  // 入队列
  add (val) {
    this.arr.push(val)
  }
  // 出队列
  poll () {
    if (this.isEmpty()) {
      return -1
    } else {
      return this.arr.shift()
    }
  }
  // 是否为空
  isEmpty () {
    return this.arr.length === 0
  }
}