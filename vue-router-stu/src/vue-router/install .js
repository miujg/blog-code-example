
export let _Vue 
import RouterLink from "./components/router-link"
import RouterView from "./components/router-view"


export function install(Vue, options) {
  _Vue = Vue
  // 将router共享给所有组件
  // 初始化router
  // 理解一下mixin
  Vue.mixin({
    beforeCreate() {
      // 根实例 this ==> vm， 判断是否是根组件。
      if (this.$options.router) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this) // this 根实例
        // 将 history的current变为响应式
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return this._routerRoot._router // push
    }
  })
  Object.defineProperty(Vue.prototype, '$route', {
    get () {
      return this._routerRoot._route
    }
  })
  Vue.component('router-link', RouterLink)
  Vue.component('router-view', RouterView)
}