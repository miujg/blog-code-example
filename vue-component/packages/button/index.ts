import { App, createApp } from 'vue'
import Button from './src/button.vue'

Button.install = (app:App) => {
  // 注册全局组件
  app.component(Button.name, Button)
}

// 联合类型 带有install方法
type IWithInstall<T> = T & {install(app:App):void}

const _Button:IWithInstall<typeof Button> = Button

export default _Button
