import { createApp } from 'vue'
import App from './App.vue'

// import 'theme-chalk/lib/index.css'
import 'theme-chalk/src/index.scss'
import MUI from 'm-ui'

// 全局引入组件
// createApp(App).use(MUI).mount('#app')

import 'element-plus/dist/index.css'
import { ElRow, ElCol } from 'element-plus'
const app = createApp(App).use(ElRow).use(ElCol)
app.use(MUI)
app.mount('#app')


