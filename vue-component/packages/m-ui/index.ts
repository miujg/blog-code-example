// // 组件统一出口
import Button from '@m-ui/button'
import Icon from '@m-ui/icon'
import Row from '@m-ui/row'
import Col from '@m-ui/col'
import { App } from 'vue'

// // 统一出口
const components = [
  Button,
  Icon,
  Row,
  Col
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
