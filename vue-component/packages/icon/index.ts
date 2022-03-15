import { App } from 'vue'
import Icon from './src/icon.vue'

Icon.install = (app:App) => {
  app.use(Icon.name, Icon)
} 

// 联合类型 带有install方法
type IWithInstall<T> = T & {install(app:App):void}

const _Icon:IWithInstall<typeof Icon> = Icon

export default _Icon