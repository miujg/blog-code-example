import { createApp } from 'vue'
import App from './App.vue'

// import 'theme-chalk/lib/index.css'
import 'theme-chalk/src/index.scss'
import MUI from 'm-ui'

// 全局引入组件
createApp(App).use(MUI).mount('#app')
