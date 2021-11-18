import { popTarget, pushTarget } from "./dep"
import { queueWatcher } from "./schedular"

// 调用 render 渲染
let id = 0
class Watcher {
  constructor(vm, exprOrfn, cb, opts) {
    this.vm = vm
    this.cb = cb
    this.opts = opts
    this.id = id++
    // 表示watcher 的状态
    this.user = opts.user
    this.getter = exprOrfn
    this.deps = [] // watcher 记住 dep
    this.depsId = new Set()
    // this.fn() // 调用render方法， 此时会对模板中的数据进取值
    this.get()
  }

  get() { 
    // 这个方法会对属性进行取值 取值的时候记住watcher
    pushTarget(this) // Dep.target = watcher
    this.getter() // 取值 渲染页面
    popTarget() //
  }
  // 当属性取值的时候 需要记住watcher 数据变化通知watcher执行
  addDep(dep) {
    // dep记住watcher
    let id = dep.id
    if(!(this.depsId.has(id))) { // dep 是非重复 watcher 肯定不会重复 
      this.depsId.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }
  update() { // 如果多次更改 希望合并成一次 （防抖）
    // this.get()  // 每一次复制都会执行相应key的watcher 不停的重新渲染
    // queueWatcher(this)
    queueWatcher(this)
  }
  run() {
    this.get()
  }
}



export default Watcher