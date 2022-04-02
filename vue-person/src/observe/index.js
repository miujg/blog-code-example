// 对应 尤大大 https://www.bilibili.com/video/BV1d4411v7UX?p=18
// Object.defineProperty 不能兼容ie8 及以下
import { isObject, def } from '../util/index'
import { arrayMethods } from './array.js' 
import Dep from './dep'

// 数据劫持类
class Observe{
  constructor(value) {
    // 给对象和数组都加一个dep
    this.dep = new Dep()

    // 这种会形成递归 每次defineReactive都会在value上添加__ob__,继续观测，往复循环。
    // 解决方法:不观测__ob__。不可枚举
    // value.__ob__ = this
    def(value, '__ob__', this)
    // 如果value层次过多
    if(Array.isArray(value)) {
      // 如果是数组并不会对索引进行观测
      // push, shift, unshift
      // 如果数组是对象再监控， 重写数组的方法重写
      Object.setPrototypeOf(value, arrayMethods)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  observeArray(value) {
    // // 重写数组方法，达到劫持效果
    // value.__proto__ = arrayMethods
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

function  dependArray(value) {
  for(let i = 0; i < value.length; i++) { // 数组中是对象，
    let current = value[i]
    // 子数组依赖收集
    current.__ob__ && current.__ob__.dep.depend()
    if(Array.isArray(current)) dependArray(current)
  }
}

function defineReactive(data, key, value) {
  // 递归实现深度劫持
  // 数组的专用dep

  // childOb data[key]为对象的时候才有
  let childOb = observe(value)
  // 每一个属性都有一个dep dep用于操作当前的watcher
  let dep = new Dep()
  Object.defineProperty(data, key, { // 需要给每个属性都增加一个dep
    get() { 
      // 首先保证全局有个watcher
      if(Dep.target) {
        dep.depend() // 让属性的dep记住watcher，也要让watcher记住 （双向）
        if(childOb) {
          // 数组的依赖搜集 将当前得watcher和数组里联系起来
          childOb.dep.depend()
          if(Array.isArray(value)) {
            // 子序列也要收集依赖
            dependArray(value)
          }
        }
      }
      return value
    },
    set(newValue) {
      if(newValue == value) return
      childOb = observe(newValue) // 继续劫持用户设置的值，有可能设置了一个新对象
      value = newValue
      dep.notify() // 通知dep中记录的watcher去执行
    }
  })
}

export function observe(data) {
  // 如果不是对象不需要劫持
  if(!isObject(data)) return
  if(data.__ob__) return
  return new Observe(data)

}