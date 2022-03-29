import { install, _Vue } from './install '
import createMatcher from './create-matcher'
import HashHistory from './history/hash';
import BrowserHistory from './history/history';

// 路由的核心原理 根据路径返回相应的组件 ====> 映射表
export default class VueRouter {
  constructor (options) {
    this.beforeEachHooks = []
    // 根据用户的配置生成映射表
    // match addRoutes(核心，面试常问)
    this.matcher = createMatcher(options.routes || [])
    switch (options.mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break;
      case 'history': 
      this.history = new BrowserHistory(this)
        break;
    }
  }
  match (location) {
    return this.matcher.match(location)
  }
  push (location) {
    this.history.push(location)
  }
  // app 为根实例 new Vue那个
  init(app) {
    // 初始化后 先根据路径做一次匹配，后续hash值变化，再次匹配

    const history = this.history

    const setupListener = () => { // 切片编程
      history.setupListener() // 监听hash值变化
    }

    // route变化 --》 router-view
    history.listen((route) => {
      // 响应式数据
      app._route = route
    })
    history.transitionTo(history.getCurrentLocation(), setupListener)

  }

  beforeEach(fn) {
    this.beforeEachHooks.push(fn)
  }
}

VueRouter.install = install
