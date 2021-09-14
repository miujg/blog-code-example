// 柯里化

function isType(type, value) {
  return Object.prototype.toString.call(value) === `[object ${type}]`
}

function curry(fn) {
  const inner = (args = [])  => {
    console.log(args)
    return args.length >= fn.length? fn(...args) : (...a) => inner([...args, ...a])
  }
  return inner()
}

let type = curry(isType)

let isString = type('String')
let isNumber = type('Number')

console.log(isString('123'))
console.log(isNumber(123))