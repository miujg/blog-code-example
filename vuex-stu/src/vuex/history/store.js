/**
 * 版本1： 实现基本功能
 */

import { applyMixin } from './mixin'


const forEachValue = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(obj[key], key) 
  })
}

let _Vue
export class Store {
  constructor(options) { 
    let computed = {}
    // options.getters
    this.getters = {}
    forEachValue(options.getters, (value, key) => {
      // 每次取值都会执行用户的方法 不太好
      // 第一次取值 缓存。 ==》 计算属性 前端缓存 基于vue的计算属性
      computed[key] = () => {
        return value.call(this, this.state)
      }
      Object.defineProperty(this.getters, key, {
        get: () => {
          return this._vm[key]
        }
      })
    })
    // this === $store
    // 将state的数据变为响应式
    // 隐身出vuex离不开vue，因为其响应式数据是基于vue实现的
    this._vm = new _Vue({
      data: {
        // $state的原因是$开头的变量vue不会对其进行代理
        // 两个$是vuex表示这个变量是其私有属性
        $$state: options.state
      },
      computed
    }) 

    this.mutations = {}
    this.actions = {}

    forEachValue(options.mutations, (fn, key) => {
      this.mutations[key] = payload => fn.call(this, this.state, payload)
    })
    forEachValue(options.action, (fn, key) => {
      this.actions[key] = payload => fn.call(this, this, payload)
    })

  }
  get state() {
    return this._vm._data.$$state
  }
  // 类中的箭头函数 es7 与 es6函数箭头函数有区别
  // commit始终指向类的实例
  commit = (type, payload) => {
    this.mutations[type](payload)
  }
  dispatch = (type, payload) => {
    this.actions[type](payload)
  }
}

export const install = (Vue) => {
  _Vue = Vue
  applyMixin(Vue)
}
