import Vue from 'vue'
// import VueRouter from '@/vue-router'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import A from '../views/A.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: About,
    component: About,
    // 需要
    meta: { requiresAuth: true },
    // component: function () {
    //   return import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
    children: [
      {
        path: 'a',
        name: 'A',
        component: A
      }
    ]
  }
]


// mode: hash history
// 单页应用。路径切换重新渲染组件，不刷新页面
// hash 特点丑 兼容性好  window.location.hash  // window.addEventListener('hashchange')
// history 特点好看 像正常路径一样 但是需要服务端支持（history-fallback 支持）// window.history.pushState  // window.addEventListener('popstate')
const router = new VueRouter({
  routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('需要验证')
  }
  next()
})




export default router
