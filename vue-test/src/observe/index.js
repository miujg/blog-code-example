import { isObject } from "../bat/util";
import { arrMethodProto } from "./array";


class Observe {
  constructor (data) {
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false
    })
    if(Array.isArray(data)) {
      // 劫持原型方法
      Object.setPrototypeOf(data, arrMethodProto)
      // 不对索引进行观测， 只对项进行观测
      data.forEach(item => observe(item))
    } else {
      this.wark(data)
    }
  }
  wark (data) {
    // 设置
    Object.keys(data).map(key => {
      let value = data[key]
      observe(value)
      Object.defineProperty(data, key, {
        get() {
          console.log(`getter: ${key}: ${JSON.stringify(value)}`)
          return value
        },
        set (newVal) {
          if(isObject(newVal)) observe(newVal)
          console.log(`setter: ${key}: ${JSON.stringify(newVal)}`)
          value = newVal
        }
      })
    })
  }
}

export function observe(data) {
  if( !isObject(data)) return
  return new Observe(data)
}