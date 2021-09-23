let has = {}
let quenu = []
function flushSchedularQueue() {
  for(let i = 0; i< quenu.length; i++) {
    let watcher = quenu[i]
    watcher.run()
  }
  quenu = []
  has = {}
}
function queueWatcher(watcher) { // 调度更新几次
  // 更新时 对watcher去重
  let id = watcher.id
  if(has[id] == null) {
    quenu.push(watcher)
    has[id] = true
    setTimeout(flushSchedularQueue, 0);
  }
}

export {
  queueWatcher
}