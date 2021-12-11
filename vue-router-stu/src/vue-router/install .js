
export let _Vue 



export function install(Vue, options) {
  _Vue = Vue
  // 将router共享给所有属性route
  // 理解一下mixin
  Vue.mixin({
     beforeCreate() {
      if (this.$options.router) {
        // 根实例 this ==> vm
        this._routerRoot = this
        this._router = this.$options.router
        // this.$router = this.$options.router
        this._router.init(this) // this 根实例
      } else {
        this._routerRoot = this.$parent && this.$parent.$parent._routerRoot
        // this.$router = this.$parent.$router
      }
     }
  })
}