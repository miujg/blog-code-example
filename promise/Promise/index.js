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

module.exports = Promise