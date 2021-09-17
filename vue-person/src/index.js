import { initMixin } from './init'
import { initState } from './state'

function Vue(options) {
  // vue的初始化
  this._init(options)

  // 数据的劫持
  const vm = this 
  vm.$options = options

  // 初始化状态
  initState(vm)
}

// 引入文件，在Vue原型上添加方法。 复杂功能拆分到不同文件
initMixin(Vue)

export default Vue