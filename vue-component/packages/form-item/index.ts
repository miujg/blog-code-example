import { App } from 'vue'
import FormItem from '../form/src/form-item.vue'

FormItem.install = (app:App) => {
  app.component(FormItem.name, FormItem)
}

type IWithInstall<T> = T & {install(app:App):void}

const _FormItem:IWithInstall<typeof FormItem> = FormItem

export default _FormItem

