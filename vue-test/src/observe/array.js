// 对数组进行劫持
// 到处一个新的原型对象

import { observe } from "./index"

const oldArrMethodProto = Array.prototype
const arrMethodProto = Object.create(oldArrMethodProto) 

// 需要劫持的函数
const methods = [
  'push',
  'unshift',
  'splice'
]


// 劫持函数
methods.forEach(method => {
  arrMethodProto[method] = function (...args) {
    const result = oldArrMethodProto[method].apply(this, args)
    let inserted
    switch(method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.splice(2)
        break
      default:
        break
    }
    // 对参数进行观测
    if(inserted) observe(inserted)
  }
})

export {
  arrMethodProto
}


