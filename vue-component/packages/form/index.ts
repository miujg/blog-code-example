import { App } from 'vue'
import Form from './src/form.vue'

Form.install = (app:App) => {
  app.component(Form.name, Form)
}

type IWithInstall<T> = T & {install(app:App):void}

const _Form:IWithInstall<typeof Form> = Form

export type FormInstance = InstanceType<typeof Form>

export default _Form

