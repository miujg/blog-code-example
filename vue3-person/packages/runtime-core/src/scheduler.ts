const queue = new Array<any>()
export function queueJob(job) {
  if (!queue.includes(job)) {
    queue.push(job)
    queueFlush()
  }
}

let isFlushPending = false
// 细品一下 和 掘金性能优化的章节
function queueFlush() {
  if(!isFlushPending) {
    isFlushPending = true
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