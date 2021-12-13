import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  name: 'root',
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
