import { install, _Vue } from './install '
import createMatcher from './create-matcher'
import HashHistory from './history/hash';
import BrowserHistory from './history/history';

// 路由的核心原理 根据路径返回相应的组件 ====> 映射表
export default class VueRouter {
  constructor (options) {
    // 根据用户的配置生成映射表
    // match addRoutes
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

  // app 为根实例 new Vue那个
  init(app) {
    // 初始化后 先根据路径做一次匹配，后续hash值变化，再次匹配

    const history = this.history

    const setupHashListener = () => {
      history.setupListener() // 监听hash值变化
    }

    history.transitionTo(history.getCurrentLocation(), setupHashListener)
  }
}

VueRouter.install = install
