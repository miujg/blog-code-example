// 对应 https://www.bilibili.com/video/BV1d4411v7UX?p=18
// Object.defineProperty 不能兼容ie8 及以下
import { isObject } from '../util/index'
import { arrayMethods } from './array.js' 

class Observe{
  constructor(value) {
    // 如果value层次过多
    if(Array.isArray(value)) {
      // 如果是数组并不会对索引进行观测
      // push, shift, unshift
      // 如果数组是对象再监控， 重写数组的方法重写
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  observeArray(value) {
    value.forEach(item => observe(item))
  }
  walk(data) {
    let keys = Object.keys(data)
    // for(let key of keys) {
    //   defineReactive(data, key, data[key])
    // }
    keys.forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}

function defineReactive(data, key, value) {
  // 递归实现深度劫持
  observe(value)
  Object.defineProperty(data, key, {
    get() { 
      console.log('xxx')
      // 依赖搜集
      return value
    },
    set(newValue) {
      if(newValue == value) return
      observe(newValue) // 继续劫持用户设置的值，有可能设置了一个新对象
      value = newValue
    }
  })
}

export function observe(data) {
  if(!isObject(data)) return
  new Observe(data)

}