import { forEachValue } from '../utils'

export default class Module {
  constructor (rawModule) {
    // 原始数据
    this._raw = rawModule
    // 孩子
    this._children = {}
    // state
    this._state = rawModule.state
  }

  get namespace () {
    return this._raw.namespaced
  }

  get state () {
    return this._state
  }

  getChild (key) {
    return this._children[key]
  }

  addChild (key, module) {
    this._children[key] = module
  }

  forEachMutations (fn) {
    const mutations = this._raw.mutations
    if(mutations) {
      forEachValue(mutations, fn)
    }
  }
  forEachActions (fn) {
    const actions = this._raw.actions
    if(actions) {
      forEachValue(actions, fn)
    }
  }
  forEachChildren (fn) {
    forEachValue(this._children, fn)
  }
  forEachGetters (fn) {
    const getters = this._raw.getters
    if(getters) {
      forEachValue(getters, fn)
    }
  }
}