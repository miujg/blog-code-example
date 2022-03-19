import { App } from 'vue'
import CheckboxGroup from '../checkbox/src/checkbox-group.vue'

CheckboxGroup.install = (app:App) => {
  app.component(CheckboxGroup.name, CheckboxGroup)
}

type IWithInstall<T> = T & { install(app:App): void }
const _CheckboxGroup:IWithInstall<typeof CheckboxGroup> = CheckboxGroup
export default _CheckboxGroup


