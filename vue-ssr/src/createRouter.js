import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Foo = () => import('./component/Foo.vue')
const Boo = () => import('./component/Bar.vue')

export default () => {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: Foo },
      { path: '/bar', component: Bar },
    ]
  })
}