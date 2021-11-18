// 数据观测类

import { isObject } from "./util";

// 1. 重写get set方法
class Observe {
  constructor(value) {
    this.value = value
    if(Array.isArray(value)) {
      this.obserArray(value)
      return
    }
    this.work(value)
  } 
  obserArray(arr) {
    arr.forEach(item => observe(item))
  }
  work(value) {
    Object.keys(value).forEach(key => {
      // 这里可以定义 dep 每一个key都会记住（闭包）
      let val = value[key]
      observe(val)
      Object.defineProperty(value, key, {
        get() {
          return val
        },
        set(newVal) {
          console.log(`set ${key} ${newVal}`)
          if(newVal !== val) {
            val = newVal
            observe(newVal)
          }
        }
      })
    })
  }
}

export function observe(data) {
  if(isObject(data)) {
    new Observe(data)
  } else {
    return
  }
}
