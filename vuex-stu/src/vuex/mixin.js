function initVuex () {
  if (this.$options.store) {
    // 根组件 new Vue({store})
    this.$store = this.$options.store
  } else if (this.$parent && this.$parent.$store) {
    this.$store = this.$parent.$store
  }
}

export const applyMixin = (Vue) => { // 将store给所有组件
  Vue.mixin({
     beforeCreate: initVuex 
  })
}