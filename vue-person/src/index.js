import { compileToFunction } from './compiler/index'
import { initGlobalApi } from './global-api/index'
import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './render'
import { createElm, patch } from './vdom/patch'
import { stateMixin } from "./state";
function Vue(options) {
  // vue的初始化
  this._init(options)
} 

// 引入文件，在Vue原型上添加方法。 复杂功能拆分到不同文件
initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
stateMixin(Vue)

// 混合全局api
initGlobalApi(Vue)

export default Vue


// diff算法理解
// 双指针 几步优化
// 自己构建两个虚拟dom， 手动进行比对


let vm1 = new Vue({
  data() {
    return {
      name: 'shaexiao'
    }
  }
})

// 将模板变成render函数
let rende1 = compileToFunction(`<ul>
  <li key="A">A</li>
  <li key="B">B</li>
  <li key="C">C</li>
  <li key="D">D</li>
</ul>`) // 将模板编译成render函数
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


let rende2 = compileToFunction(`<ul>
  <li key="E">E</li>
  <li key="A">A</li>
  <li key="F">F</li>
  <li key="B">B</li>
</ul>`)
// let rende2 = compileToFunction(`<ul>
//   <li key="G">G</li>
//   <li key="F">F</li>
//   <li key="E">E</li>
//   <li key="A">A</li>
//   <li key="B">B</li>
//   <li key="C">C</li>
//   <li key="D">D</li>
// </ul>`) 
let newVnode = rende2.call(vm2)

setTimeout(() => {
  patch(oldVnode, newVnode)
}, 1000);