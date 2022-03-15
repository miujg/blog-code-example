import { createApp } from 'vue'
import App from './App.vue'

import 'theme-chalk/lib/index.css'
import MUI from 'm-ui'

console.log(MUI)

// 全局引入组件
createApp(App).use(MUI).mount('#app')
