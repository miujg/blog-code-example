// 依赖收集类
let id = 0
class Dep {
  constructor () {
    // Dep id
    this.id = id++
    // 收集watcher的队列
    this.subs = []
  }
  // 收集依赖
  addSub (watcher) {
    this.subs.push(watcher)
  }
  // 更新依赖 逐个执行watcher 的update
  notify () {
    // this.subs.forEach(watcher => watcher.update())
  }
}

export default Dep