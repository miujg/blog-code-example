function runQueue(queue, iterator, cb) {
  function next (index) {
    if(index >= queue.length) {
      return cb()
    } else {
      let hook = queue[index]
      iterator(hook, () => {
        next(index + 1)
      })

    }
  }
  next(0)
}

export function createRoute(record, location) {
  let res = []
  while (record) {
    res.unshift(record)
    record = record.parent
  }
  return {
    ...location,
    matched: res
  }
}

export default class History {
  constructor (router) {
    this.router = router
    // 变成响应式数据
    this.current = createRoute(null, {
      path: '/'
    })
  }

  // 核心方法
  // 根据路径 进行组件渲染  数据变化更新视图
  transitionTo(location, onCompleate) {

    const iterator = (hook, cb) => {
      hook(this.router, this.current, cb)
    }
    let route = this.router.match(location)
    
    // 执行hooks

    let queue = [].concat(this.router.beforeEachHooks)
    debugger
    runQueue(queue, iterator, () => {
      this.current = route 
      // 为了响应式
      this.cb(route) // -----> 核心更新路由
      onCompleate && onCompleate()
    })

  }
  // 为了响应式
  listen(cb) {
    this.cb = cb
  } 
}