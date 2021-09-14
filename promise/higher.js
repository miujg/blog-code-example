// 高阶函数
// 定义: 函数作为参数，函数作为结果返回
// 作用: 变量暂存 回调函数 扩展函数功能

// 不改变drive内部代码的同事，扩展了drive函数
function drive(...args) {
  console.log('开车', args)
}

// 扩展，在开车钱系上安全带

Function.prototype.before = function(beforeFn) {
  return (...args) => {
    beforeFn()
    this(...args)
  }
}

function safe() {
  console.log('安全带')
}

// let newDrive = drive.before(safe)
// newDrive('xxx','yyy')


// curry 柯里化 偏函数
// 让函数变得具体

// 判断类型的函数
function isType(type, value) {
  return Object.prototype.toString.call(value) === `[object ${type}]`
}

function sub(a, b, c, d) {
  return a + b + c + d
}

// const curry = function(fn) {
//   let args = []
//   const inner = (...arr) => {
//     args.push(...arr)
//     console.log(arr, args)
//     return args.length >= fn.length? fn(...args) : (...args) => inner(...args)
//   }
//   return inner
// }

const curry = function(fn) {
  const inner = (...args) => {
    return args.length >= fn.length? fn(...args) : (...arr) => inner(...args, ...arr)
  } 
  return inner
}

const type = curry(isType)
const isNumber = type('Number')
const isString = type('String')

// console.log(isNumber(123))
// console.log(isNumber(12))

// 订阅 && 发布
// 订阅与发布可以分开
// 读取文件
const fs = require('fs')

const event = {
  _arr: [],
  on(fn) {
    this._arr.push(fn)
  },
  emit(...args) {
    this._arr.forEach(fn => fn(...args))
  }
}
// 订阅
event.on((data) => console.log(data))
fs.readFile('./aa.text', 'utf8', (err, data) => {
  // 发布
  event.emit(data)
})

fs.readFile('./bb.text', 'utf8', (err, data) => {
  event.emit(data)
})

// 观察者模式

// 被观察
class Subject {
  constructor(name) {
    this.name = name
    this._arr = []
    this.emo = '开心'
  }
  // 注册观察者
  attch(o) {
    this._arr.push(o)
  }
  setEmo(emo) {
    this.emo = emo
    this._arr.forEach(o => o.update(emo))
  }
}
// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  update(data) {
    console.log(`${this.name},${data}`)
  }
}

let mom = new Observer('mon')
let father = new Observer('father')

let baby = new Subject('baby')
baby.attch(mom)
baby.attch(father)
baby.setEmo('sad')
baby.setEmo('happy')







