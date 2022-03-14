const queue = new Array<any>()
export function queueJob(job) {
  if (!queue.includes(job)) {
    queue.push(job)
    queueFlush()
  }
}

// 相当于一个锁，当一个effect进来之后，马上关门处理这个effect
// 处理这个job的时候不允许其他的进来，不受其他影响
let isFlushPending = false
// 细品一下 和 掘金性能优化的章节
function queueFlush() {
  if(!isFlushPending) {
    isFlushPending = true
    // 将job派发成微任务
    Promise.resolve().then(flushJobs)
  }
}

function flushJobs() {
  isFlushPending = false
  // 清空时， 需要根据调用顺序一次刷新
  // 父组件的effect 序号要小一些
  // 先刷新父 再到子
  queue.sort((a,b) => a.id - b.id)
  for(let i = 0; i < queue.length; i++) {
    const job = queue[i]
    job()
  }

  queue.length = 0
}