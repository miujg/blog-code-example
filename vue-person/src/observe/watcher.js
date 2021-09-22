// 调用 render 渲染
let id = 0
class Watcher {
  constructor(vm, fn, cb, opts) {
    this.vm = vm
    this.fn = fn
    this.cb = cb
    this.opts = opts
    this.id = id++
    this.fn()
  }
}

export default Watcher