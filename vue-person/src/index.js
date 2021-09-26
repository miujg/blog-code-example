import { compileToFunction } from './compiler/index'
import { initGlobalApi } from './global-api/index'
import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './render'
import { createElm, patch } from './vdom/patch'
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

// diff算法理解
// 自己构建两个虚拟dom， 手动进行比对

let vm1 = new Vue({
  data() {
    return {
      name: 'shaexiao'
    }
  }
})

// 将模板变成render函数
let rende1 = compileToFunction(`<div id="a" a="1">{{name}}</div>`) // 将模板编译成render函数
let oldVnode = rende1.call(vm1) // 老大虚拟节点
// 创建真实节点
let el = createElm(oldVnode)
document.body.appendChild(el)

let vm2 = new Vue({
  data() {
    return {
      name: 'jgmiu'
    }
  }
})

let rende2 = compileToFunction(`<div id="b" b="2">{{name}}</div>`) // 将模板编译成render函数
let newVnode = rende2.call(vm2)

console.log(oldVnode, newVnode)

setTimeout(() => {
  patch(oldVnode, newVnode)
}, 2000);

// 初渲染和diff算法逻辑


export default Vue