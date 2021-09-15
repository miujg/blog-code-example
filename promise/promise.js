// 三种状态： 等待、 失败、 成功
// 解决异步问题

// const Promise = require('./Promise/index.js')
// const fs = require('fs')

// function readFile(filePath) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if(err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   })
// }


// const p = new Promise((resolve, reject) => {
//   resolve(1000)
// })
// p.then(data => {throw new Error('xxx')}).catch(err => console.log(err, 111))

// const t = Promise.resolve(123).then(res => console.log(res))


const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

// promise A+ 多个promise箭筒
const resolvePromise = (x, promise2, resolve, reject) => {
  if(x === promise2) {
    throw new TypeError('Chaining cycle detected for promise')
  }
  // 如果x是一个对象或函数(可能是一个promise)
  if((typeof x === 'object' || typeof x === 'function') && x !== null) {
    try {
      let then = x.then
      // 判断是否有then方法
      if(then && typeof then === 'function') {
        then.call(x, y => resolvePromise(y, promise2, resolve, reject), r => reject(r))
      } else{
        resolve(x)
      }
    } catch (error) {
      reject(error)
    }
  } else {
    // 普通值
    resolve(x)
  }
}
class Promise {
  constructor(execute) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallback = []
    this.onRejectedCallback = []
    const reject = reason => {
      if(this.status !== PENDING) return
      this.status = REJECTED
      this.reason = reason
      this.onRejectedCallback.forEach(fn => fn())
    }
    const resolve = value => {
      if(this.status !== PENDING) return
      if(value instanceof Promise) {
        return value.then(resolve, reject)
      }
      this.status = FULFILLED
      this.value = value
      this.onResolvedCallback.forEach(fn => fn())
    }
    try {
      // 同步执行函数
      execute(resolve, reject)
    } catch (err) {
      this.status = REJECTED
      this.reason = err
    }
  }
  then(onFulfilled, onRejected) {
    console.log(this.status)
    typeof onFulfilled === 'function'? onFulfilled : v => v
    typeof onRejected === 'function'? onRejected : err => {throw err}
    const promise2 = new Promise((resolve, reject) => {
      if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)        
          } catch (error) {
            reject(error)
          }
        }, 0)
      } 
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)         
          } catch (error) {
            reject(error)
          }
        }, 0)
      } 
      // 订阅&发布处理异步
      if(this.status === PENDING) {
          this.onResolvedCallback.push(() => {
            setTimeout(() => {
              try {
                let x = onFulfilled(this.value)
                resolvePromise(x, promise2, resolve, reject)         
              } catch (error) {
                reject(error)
              }
            }, 0)
          })
          this.onRejectedCallback.push(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
      }
    }) 
    return promise2
  }
  catch(onRejected) {
    this.then(null, onRejected)
  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }
}

Promise.resolve(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('xxxx')
  }, 1000)
})).then(res => console.log(res))

// catch

// const p1 = new Promise((resolve, reject) => {
//   resolve('111')
//   reject('xxx')
// })
// const p1 = readFile('aa.text')
// const p1 = new Promise((resolve, reject) => {
//   resolve(new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(111)
//     }, 100)
//   }))
// })

// let p = p1.then(data => {
//   return data
// })
// .then(data => {
//   console.log(data, 28)
// })

// p1.then(data => {
//   console.log(data, 222)
//   // return readFile(data)
// })

// p2.then(data => {
//   console.log(data)
// })


// p1.then(data => {
//   console.log(data, 13)
// }, err => {
//   console.log(err, 2222)
// })

// 测试promise 是否符合promise a+规范
// Promise.deferred = function() {
//   let def = {}
//   def.promise = new Promise((resolve, reject) => {
//     def.resolve = resolve
//     def.reject = reject
//   })
//   return def
// }

// npm install -g promises-aplus-tests
// promises-aplus-tests xx.js