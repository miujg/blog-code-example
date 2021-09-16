const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
const resolvePromise = (x, promise2, resolve, reject) => {
  if(x === promise2) {
    throw new TypeError('Chaining cycle detected for promise')
  }
  // 如果x是一个对象或函数(可能是一个promise)
  if((typeof x === 'object' || typeof x === 'function') && x !== null) {
    console.log(x)
    try {
      let then = x.then
      // 判断是否有then方法
      if(then && typeof then === 'function') {
          then.call(x, y => resolve(y), r => reject(r))
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
}

module.exports = Promise