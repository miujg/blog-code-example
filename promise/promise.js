// 三种状态： 等待、 失败、 成功
// 解决异步问题

const Promise = require('./Promise/index.js')

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

p1.then(data => {
  console.log(data)
}, err => {
  console.log(err)
})
