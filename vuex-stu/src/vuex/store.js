import Vue from 'vue'
import store from '../store'
import { applyMixin } from './mixin'
import ModuleCollection from './module/module-collect'


const forEachValue = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(obj[key], key)
  })
}

let _Vue

/**
 * 根据path获取state
 * @param {*} store 
 * @param {*} path 
 */
function getState(store, path) {
  return path.reduce((state, current) => {
    return state[current]
  }, store.state)
}

function installModules(store, path, module, rootState) {
  let namespace = store._modules.getNamespace(path)
  // 状态
  if (path.length > 0) { // 子模块
    let parent = path.slice(0, -1).reduce((memo, current) => {
      return memo[current]
    }, rootState)
    // 响应式
    // Vue.set(parent, path[path.length - 1], module.state)
    parent[path[path.length - 1]] = module.state
    // parent[path[path.length - 1]] = module.state
  }

  // 安装mutation
  module.forEachMutations((mutation, key) => {
    store.mutations[namespace + key] = store.mutations[namespace + key] || []
    // commit之后会走到这里, 得到store state payload
    store.mutations[namespace + key].push(payload => mutation.call(store, getState(store, path), payload))
  })

  // 安装action
  module.forEachActions((action, key) => {
    store.actions[namespace + key] = store.actions[namespace + key] || []
    store.actions[namespace + key].push(payload => action.call(store, store, payload))
  })

  module.forEachChildren((childModule, key) => {
    installModules(store, path.concat(key), childModule, rootState)
  })

  // getters
  module.forEachGetters((getterFn, key) => {
    store.wrapGetters[namespace + key] = () => {
      return getterFn(getState(store, path))
    }
  })
}

export class Store {
  constructor(options) { 
    const computed = {}
    // 嵌套modual
    // options => 格式化属性结构
    // 专门的类用于模块收集

    // 将用户传入的options，变成modules
    this._modules = new ModuleCollection(options)
    // 不考虑namespace的情况下 将module中的mutations 和 actions取出
    this.mutations = {}
    this.actions = {}
    this.wrapGetters = {}
    this.getters = {}
    this.strict = options.strict
    const state = options.state
    // 安装模块
    installModules(this, [], this._modules.root, state)
    console.log(state)
    forEachValue(this.wrapGetters, (fn, key) => {
      // 将getter的key变成计算属性的key
      computed[key] = fn
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    })
    console.log(computed)
    // state getter定义
    this._vm = new _Vue({
      // 只是为了将state变成响应式
      data: {
        $$state: state
      },
      // getter全部变为计算属性
      computed
    })
    this._commiting = true
    this._withCommiting = function (fn) {
      // const committing = this._commiting
      this._commiting = true 
      fn()
      this._commiting = false
    }
    // 严格模式下监控报错
    if (this.strict) {
      this._vm.$watch(() => this._vm._data.$$state, () => {
        console.log('xxxx')
        // 爆出一些警告啥的呀
        if (!this._commiting) console.warn('mutaion 之外修改')
      }, {sync: true, deep: true})
    }
    // console.log(this.state)
    // console.log(this.getters)
    // console.log(this.mutations)
    // console.log(this.actions)

    this._subscribes = []
    // 执行plugin
    if(options.plugins) {
      options.plugins.forEach(plugin => plugin(this))
    }

    // 严格模式判断
  }

  get state() {
    return this._vm._data.$$state
  }

  subscirbe(fn) {
    this._subscribes.push(fn)
  }

  replaceState(newState) {
    // 就这短短的一句 也吧newState变成响应式的了
    this._vm._data.$$state = newState
  }

  commit = (type, payload) => {
    const mutaions = this.mutations[type]
    if (mutaions) {
      this._withCommiting(() => {
        mutaions.forEach(fn => fn(payload)) // 状态更新了
      })
      this._subscribes.forEach(fn => fn(type, this.state))
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