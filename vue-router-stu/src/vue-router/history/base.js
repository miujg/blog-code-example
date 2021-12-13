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
    let route = this.router.match(location) 
    this.current = route 
    // 为了响应式
    this.cb(route)

    onCompleate && onCompleate()
  }
  // 为了响应式
  listen(cb) {
    this.cb = cb
  } 
}