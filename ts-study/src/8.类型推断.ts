// 类型推断

// 1. 赋值时推断
// 2. 函数默认会推断
// 3. 返回值的推断
// 4. 属性推断

let str = '' //推导为string ， 不赋值推导为any
let sum = (a:number, b:number) => a + b // 1.推导sum的类型 2.推导返回值类型
let school = { // 属性也可以推导 推导name为string
  name: 'xx'
} 

// 类型反推
type MySchool = typeof school

// 





export {}