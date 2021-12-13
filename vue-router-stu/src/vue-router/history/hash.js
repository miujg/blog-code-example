import History from './base'

function ensureSlash() {
  if(window.location.hash) {
    return 
  } else {
    window.location.hash = '/'
  }
}

function getHash () {
  return window.location.hash.slice(1)
}


export default class HashHistory extends History {
  constructor (router) {
    super (router)
    // 首先给地址加一个 #/
    ensureSlash();
  }

  // hash模式的核心功能： 监听hash值得变化
  setupListener () {
    // 这里也可以用popstate（高版本浏览器）， 且其性能更好 
    window.addEventListener('hashchange', () => {
      // 根据当前hash值 去配置对应的组件
      // todo...
      console.log(window.location.hash)
      this.transitionTo(this.getCurrentLocation())
    })
  }

  getCurrentLocation () {
    return getHash()
  }

  push (location) {
    // this.transitionTo(location)
    window.location.hash = location
  }
}