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

// const p1 = new Promise((resolve, reject) => {
//   resolve('111')
//   reject('xxx')
// })
const p1 = readFile('aa.text')

let p = p1.then(data => {
  return readFile(data) 
}).then(data => {
  console.log(data, 28)
})

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


function a() {}

console.log(typeof {a: 11})
console.log(typeof a)
