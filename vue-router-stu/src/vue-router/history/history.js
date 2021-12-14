import History from './base'

export default class BrowserHistory extends History {
  constructor (router) {
    super (router)
  }

  getCurrentLocation () {
    return window.location.pathname
  }

  setupListener () {
    // 监听浏览器的前进与后退
    // 路劲变化不能监控到
    window.addEventListener('popstate', () => {
      this.transitionTo(this.getCurrentLocation())
    })
  }

  push (location) {
    this.transitionTo(location, () => {
      // 跳转采用h5的api了
      window.history.pushState({}, null, location)
    })
  }
}

// vue-router中的导航路由 核心就是把所有方法 组合成一个数组 依次调用