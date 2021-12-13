// 栈数据结构 ---- 待实现
export default class Stack {
  constructor () {
    this.arr = []
  }
  push (val) {
    this.arr.push(val)
  }
  pop () {
    if (this.isEmpty()) return
    return this.arr.pop()
  }
  isEmpty () {
    return this.arr.length === 0
  }
}