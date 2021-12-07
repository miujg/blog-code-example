import Vue from 'vue'
import { applyMixin } from './mixin'
import ModuleCollection from './module/module-collect'


const forEachValue = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(obj[key], key)
  })
}

let _Vue

function installModules(store, path, module, rootState) {
  
  // 状态
  if (path.length > 0) { // 子模块
    let parent = path.slice(0, -1).reduce((memo, current) => {
      return memo[current]
    }, rootState)
    // 响应式
    Vue.set(parent, path[path.length - 1], module.state)
    // parent[path[path.length - 1]] = module.state
  }

  // action mutation
  module.forEachMutations((mutation, key) => {
    store.mutations[key] = store.mutations[key] || []
    store.mutations[key].push(payload => mutation.call(store, module.state, payload))
  })

  module.forEachActions((action, key) => {
    store.actions[key] = store.actions[key] || []
    store.actions[key].push(payload => action.call(store, store, payload))
  })

  module.forEachChildren((childModule, key) => {
    installModules(store, path.concat(key), childModule, rootState)
  })

  // getters
  module.forEachGetters((getterFn, key) => {
    store.wrapGetters[key] = () => {
      return getterFn(module.state)
    }
  })
}

export class Store {
  constructor(options) { 
    const computed = {}
    // 嵌套modual
    // options => 格式化属性结构
    // 专门的类用于模块收集
    this._modules = new ModuleCollection(options)
    // 不考虑namespace的情况下 将module中的mutations 和 actions取出
    this.mutations = {}
    this.actions = {}
    this.wrapGetters = {}
    this.getters = {}
    const state = options.state
    installModules(this, [], this._modules.root, state)
    forEachValue(this.wrapGetters, (fn, key) => {
      computed[key] = fn
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    })
    // state getter定义
    this._vm = new _Vue({
      data: {
        $$state: state
      },
      computed
    })
    // console.log(this.state)
    // console.log(this.getters)
    // console.log(this.mutations)
    // console.log(this.actions)
  }

  get state() {
    return this._vm._data.$$state
  }

  commit = (type, payload) => {
    const mutaions = this.mutations[type]
    if (mutaions) {
      mutaions.forEach(fn => fn(payload))
    }
  }

  dispatch = (type, payload) => {
    const actions = this.actions[type]
    if (actions) {
      actions.forEach(fn => fn(payload))
    }
  }
}

export const install = (Vue) => {
  _Vue = Vue
  applyMixin(Vue)
}



// const _root = {
//   _raw: {state, mutations, getters},
//   _state: state,
//   children: {
//     a: {},
//     b: {}
//   }
// }