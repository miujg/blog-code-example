// // 组件统一出口
import Button from '@m-ui/button'
import Icon from '@m-ui/icon'
import { App } from 'vue'

// // 统一出口
const components = [
  Button,
  Icon
]

const install = (app:App) => {
  // 遍历注册组件
  components.forEach(component => {
    app.component(component.name, component)
  })
}

// // 在使用组件库的时候，createApp().use(xxx)
export default {
  install 
}