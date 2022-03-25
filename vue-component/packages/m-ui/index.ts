// // 组件统一出口
import Button from '@m-ui/button'
import Icon from '@m-ui/icon'
import Row from '@m-ui/row'
import Col from '@m-ui/col'
import Checkbox from '@m-ui/checkbox'
import CheckboxGroup from '@m-ui/checkbox-group'
import Transfer from '@m-ui/transfer'
import Form from '@m-ui/form'
import FormItem from '@m-ui/form-item'
import { App } from 'vue'

// // 统一出口
const components = [
  Button,
  Icon,
  Row,
  Col,
  Checkbox,
  CheckboxGroup,
  Transfer,
  Form,
  FormItem
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
