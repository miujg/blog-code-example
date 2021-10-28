// 泛型 声明的时候不确定类型 使用的时候才决定类型
// 场景： 函数 接口 类型别名 类

// 1)函数中使用类型
function createArr<T>(times:number, val:T) {
  let result: T[] = []
  for(let i = 0; i < times; i++) {
    result[i] = val
  }
  return result
}

let r = createArr<string>(3, '1') 


// 约束function
interface MySwap {
  <A,B>(tuple: [A,B]):[B, A]
}

// 使用多个泛型 数组交换
// function swap<T,K>(tuple:[T,K]):[K,T] {
//   return [tuple[1], tuple[0]]
// }
// 函数表达式的写法
const swap:MySwap = <T, K>(tuple:[T,K]):[K, T] => {
  return [tuple[1], tuple[0]]
}

swap([1, 2]) 


// 泛型约束 extends 与class extends语义有区别
// 有用length属性的约束
type WithLength = {
  length: number
}
function getType<T extends WithLength>(obj:T) {
  return obj.length
}

// 默认泛型 不传递 默认给个类型
interface DStr<T=string> {
  name:T
}
type T1 = DStr
type T2 = DStr<number>
let str:T2 = {name: 1}
// 约束属性
// K为T的所有属性中的一个
const getVal = <T extends object, K extends keyof T>(obj:T, key:K) => {
  return obj[key]
}

const res = getVal({a: false, b: 2}, 'b')
console.log(res)

// keyof 妙用
// let aa = keyof string

// 类中使用泛型：

class MyArray<T> {
  arr: T[] = []
  add(v:T) {
    this.arr.push(v)
  }
}

// 当使用的时候出入

let arr1 = new MyArray<number>()
arr1.add(1)
export {}