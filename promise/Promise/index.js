const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

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
    }
    const resolve = value => {
      if(this.status !== PENDING) return
      this.status = FULFILLED
      this.value = value
    }
    try {
      execute(resolve, reject)
    } catch(err) {
      this.status = REJECTED
      this.reason = err
    }
  }
  then(onFulfilled, onRejected) {
    if(this.status === REJECTED) onRejected(this.reason)
    if(this.status === FULFILLED) onFulfilled(this.value)
  }
}

module.exports = Promise