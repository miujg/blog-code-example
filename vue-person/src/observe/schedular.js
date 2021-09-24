import { nextTick } from "../util/index"

// 任务调度，多个watcher只调用最后一个
let has = {}
let quenu = []
function flushSchedularQueue() {
  for(let i = 0; i< quenu.length; i++) {
    let watcher = quenu[i]
    watcher.run()
  }
  quenu = []
  has = {}
  pending = false
}

let pending = false
function queueWatcher(watcher) { // 调度更新几次
  // 更新时 对watcher去重
  let id = watcher.id
  if(has[id] == null) {
    quenu.push(watcher)
    has[id] = true
    // 异步渲染 同步代码设置值 逻辑运行完毕之后才执行
    // nextTick(flushSchedularQueue);
    if(!pending) {
      pending = true
      nextTick(flushSchedularQueue)
    }
  }
}

export {
  queueWatcher
}