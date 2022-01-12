import Vue from 'vue'
import App from './App.vue'
import createRouter from './createRouter'

export default () => {
  const app = new Vue({
    render: h => h(App),
    // 每个app实例都有一个router
    router: createRouter()
  })
  return { app }
}