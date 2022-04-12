import { callHook } from "../lifecycle"
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
    this.sync = opts.sync
    this.user = opts.user // 表示watcher是用户watcher
    this.lazy = opts.lazy // 表示计算属性
    this.dirty = this.lazy
    if (typeof exprOrfn === 'function') {
      this.getter = exprOrfn
    } else {
      // exprOrfn 可能是watch的key值
      // 在vm上取值
      this.getter = function () {
        // 这里取值的时候，就会让dep记住watcher
        // 根据key 取值: a.b.c.d
        let path = exprOrfn.split('.')
        let val = vm
        for(let i = 0; i < path.length; i++) {
          val = val._data[path[i]]
        } 
        return val
      }
    }
    this.deps = [] // watcher 记住 dep
    this.depsId = new Set()
    // this.fn() // 调用render方法， 此时会对模板中的数据进取值
    // 老值 用于watcher
    this.value =  this.lazy ? null : this.get()
  }
  // 给计属性
  evaluate () {
    this.value = this.get()
    // 缓存
    this.dirty = false
  }
  get() { 
    // 这个方法会对属性进行取值 取值的时候记住watcher
    pushTarget(this) // Dep.target = watcher
    let value =  this.getter.call(this.vm) // 取值 渲染页面
    popTarget() //
    return value
  }
  // 当属性取值的时候 需要记住watcher 数据变化通知watcher执行
  addDep(dep) {
    // dep记住watcher
    let id = dep.id
    if(!(this.depsId.has(id))) { // dep 是非重复 watcher 肯定不会重复 
      this.depsId.add(id)
      this.deps.push(dep)
      // 让这个dep 也记住这个wathcer
      dep.addSub(this)
    }
  }
  update() { // 如果多次更改 希望合并成一次 （防抖）
    // this.get()  // 每一次复制都会执行相应key的watcher 不停的重新渲染
    // queueWatcher(this)
    if (this.sync) {
      this.run()
    } else if (this.lazy) {
      // 计算属性
      this.dirty = true
    } else {
      queueWatcher(this)
    }
  }
  run() {
    let oldVlaue = this.value 
    let newValue = this.get()
    this.value = newValue
    if(this.user) { // 如果当前是用户watcher 执行用户的callback
      this.cb.call(this.vm, newValue, oldVlaue)
    }
  }
}



export default Watcher