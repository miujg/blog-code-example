// 当前watcher 放在一个全局变量上

let id = 0
class Dep {
  constructor() {
    this.id = id++
    // dep 记住 watcher
    this.subs = [] // 属性记住watcher
  }
  depend() {
    // 让watcher记住dep
    Dep.target.addDep(this)
  }
  addSub(watcher) { // 存储watcher
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}

Dep.target = null


export function pushTarget(watcher) {
  Dep.target = watcher
}

export function popTarget() {
  Dep.target = null
}


export default Dep