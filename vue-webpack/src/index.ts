
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
console.log(app)
app.mount('#app')

type MyType = {
  name: string
}

const a: MyType = { name: '123' }

console.log(a)
