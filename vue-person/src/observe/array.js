// 重写数组方法
// 装饰模式
// push shift unshift pop reverse sort splice 导致数组本身发生变化

const oldArrayMethods = Array.prototype
// 新的原型对象，在这个对象上重写方法
const arrayMethods = Object.create(oldArrayMethods)

const methods = [
  'push',
  'unshift',
  'splice'
]

methods.forEach(method => {
  arrayMethods[method] = function(...args) {
    const result = oldArrayMethods[method].apply(this, args)
    let inserted
    let ob = this.__ob__
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
    if(inserted) ob.observeArray(inserted)
    ob.dep.notify()
    // 对insert进行观测
    return result
  }
})

// arrayMethods.push = function(data) {
//   // 对data进行数据劫持
//   // 1. 普通类型 2. 数组 3. 对象
//   arrayMethods.__proto__.push.call(this, data)
// }



export {
  arrayMethods
}