
function resolvePromise(promise2, x, resolve, reject) {
  var then 
  var thenCalledOrThrow = false
  // 如果x与promise2是同一个对象，返回一个类型错误
  if (promise2 === x) {
    throw new TypeError('Chaining cycle detected for promise')
  }

  // x是一个promise对象
  if (x instanceof Promise) {
    // 如果x状态为pending
    if (x.status === 'pending') {
      // promise保持pending状态，知道x成功或者失败
      x.then(value => {
        resolvePromise(promise2, value, resolve, reject)
      }, reject)
    } else {
      // 采用x的状态（成功或者失败）
      x.then(resolve, reject)
    }
  }
  
  // x 是一个函数或者对象
  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      then = x.then
      // then 是一个函数
      if (typeof then === 'function') {
        // 执行then方法
        then.call(x, y => {
          if (!thenCalledOrThrow) {
            thenCalledOrThrow = true
            resolvePromise(promise2, y, resolve, reject)
          }
        }, r => {
          if (!thenCalledOrThrow) {
            thenCalledOrThrow = true
            reject(r)
          }
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (!thenCalledOrThrow) {
        thenCalledOrThrow = true
        reject(error)
      }
    }
  } else {
    // 如果x不是函数或者对象，用x来完成promise
    resolve(x)
  }
}

// pending resolved rejected
function Promise(executor) {
  var self = this
  self.status = 'pending'
  self.data = undefined
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  // 判断promise的状态， 设置data的值， 执行回调
  function resolve(value) {
    // todo
    if (self.status === 'pending') {
      self.status = 'resolved'
      self.data = value
      for(let i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value)
      }
    }
  }

  function reject(reson) {
    // todo
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.data = reson
      for(let i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reson)
      }
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

// then 方法的实现

Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  // then方法必须返回一个promise
  var promise2 
  // 根据标准 onResolve/onReject 不是函数去忽略
  onResolved = typeof onResolved === 'function' ? onResolved : function(value) {return value}
  onRejected = typeof onRejected === 'function' ? onRejected : function(reason) {}

  if (self.status === 'resolved') {
    promise2 = new Promise(function(resolve, reject) {
      setTimeout(() => {
        try {
          var x = onResolved(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  if (self.status === 'rejected') {
      promise2 = new Promise(function(resolve, reject) {
        setTimeout(() => {
          try {
            var x = onRejected(self.data)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
    })
  }

  if (self.status === 'pending') {
    promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        setTimeout(() => {
          try {
            var x = onResolved(value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
      
      self.onRejectedCallback.push(function(reason) {
        setTimeout(() => {
          try {
            var x = onRejected(reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
    })
  }

  return promise2
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

var p = new Promise((resolve, reject) => {
  resolve(10)
})

p.then(data => {
  return new Promise((resolve, reject) => {
    resolve(data + 1)
  })
})
