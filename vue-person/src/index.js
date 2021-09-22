import { initMixin } from './init'

function Vue(options) {
  // vue的初始化
  this._init(options)

} 

// 引入文件，在Vue原型上添加方法。 复杂功能拆分到不同文件
initMixin(Vue)

export default Vue