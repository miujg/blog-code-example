// 三种状态： 等待、 失败、 成功
// 解决异步问题

const Promise = require('./Promise/index.js')
const fs = require('fs')

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}


const p = new Promise((resolve, reject) => {
  resolve(1000)
})
// p.then(data => {throw new Error('xxx')}).catch(err => console.log(err, 111))

// const t = Promise.resolve(123).then(res => console.log(res))
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