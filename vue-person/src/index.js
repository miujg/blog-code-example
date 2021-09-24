import { initGlobalApi } from './global-api/index'
import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './render'
function Vue(options) {
  // vue的初始化
  this._init(options)
} 

// 引入文件，在Vue原型上添加方法。 复杂功能拆分到不同文件
initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

// 混合全局api
initGlobalApi(Vue)

export default Vue