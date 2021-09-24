export function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

export function def(data, key, value) {
  Object.defineProperty(data, key, {
    configurable: false,
    enumerable: false,
    value
  })
}

export function proxy(vm, key) {
  
}


let callbacks = []
let waiting = false
// 批处理 第一次开定时器，后续只更新列表 之后清空逻辑
function flushCallbacks() {
  callbacks.forEach(callback => {
    callback()
  })
  waiting = false
  callbacks = []
}

export function nextTick(cb) {
  callbacks.push(cb) // 默认的cb是渲染逻辑 用户逻辑放在渲染逻辑之后

  // 类似于开一个定时器， 异步任务通道存放任务, 执行多次 开几个定时器 导致重复运行，需要flag
  // 事件循环 微任务
  // waiting 相当于一个锁
  if(!waiting) {
    waiting = true
    Promise.resolve().then(flushCallbacks)
  }
}