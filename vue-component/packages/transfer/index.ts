import { App } from 'vue'
import Transfer from './src/transfer.vue'

Transfer.install = (app:App) => {
  app.component(Transfer.name, Transfer)
}

type IWithInstall<T> = T & { install(app:App): void }
const _Transfer:IWithInstall<typeof Transfer> = Transfer
export default _Transfer


