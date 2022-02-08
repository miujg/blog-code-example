var p = new Promise((resolve, reject) => {
  resolve(10)
})

p.then(data => {
  console.log(aaa)
  return data
}).catch(err => {
  console.error('xxxx',err)
})
