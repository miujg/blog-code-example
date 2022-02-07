
function resolvePromise(promise2, x, resolve, reject) {
  var then 
  var thenCalledOrThrow = false
  // If promise and x refer to the same object, reject promise with a TypeError as the reason
  if (promise2 === x) {
    throw new TypeError('Chaining cycle detected for promise')
  }

  if (x instanceof Promise) {
    if (x.status === 'pending') {
      x.then(value => {
        resolvePromise(promise2, value, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
  }
  
  // x 是一个函数或者对象
  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      then = x.then
      // then 是一个函数
      if (typeof then === 'function') {

      } else {
        resolve(x)
      }
    } catch (error) {
      
    }
  } else {
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
      try {
        var x = onResolved(self.data)
        resolvePromise(promise2, x, resolve, reject)
      } catch (error) {
        reject(error)
      }
    })
  }

  if (self.status === 'rejected') {
      promise2 = new Promise(function(resolve, reject) {
      try {
        var x = onRejected(self.data)
        resolvePromise(promise2, x, resolve, reject)
      } catch (error) {
        reject(error)
      }
    })
  }

  if (self.status === 'pending') {
    promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(resolve, reject) {
        try {
          var x = onResolved(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
      
      self.onRejectedCallback.push(function(resolve, reject) {
        try {
          var x = onRejected(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  return promise2
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

var p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10)
  },2000)
})

p.then(data => {
  console.log(data)
})

// new Promise(resolve=>resolve(8))
//   .then()
//   .then()
//   .then(function foo(value) {
//     alert(value)
//   })