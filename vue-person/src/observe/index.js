// 对应 尤大大 https://www.bilibili.com/video/BV1d4411v7UX?p=18
// Object.defineProperty 不能兼容ie8 及以下
import { isObject, def } from '../util/index'
import { arrayMethods } from './array.js' 

// 数据劫持类
class Observe{
  constructor(value) {
    // 这种会形成递归 每次defineReactive都会在value上添加__ob__,继续观测，往复循环。
    // 解决方法:不观测__ob__。不可枚举
    // value.__ob__ = this
    def(value, '__ob__', this)
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
    // 重写数组方法，达到劫持效果
    value.__proto__ = arrayMethods
    // 对数组里面的对象进行劫持
    value.forEach(item => observe(item))
  }
  walk(data) {
    let keys = Object.keys(data)
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
  // 如果不是对象不需要劫持
  if(!isObject(data)) return
  new Observe(data)

}