// 函数 函数字面量 函数表达式

// 考虑入参和返回值

function sum(a:string, b) {
  return a + b
}

console.log(sum)
type Sum = (a: string, b?: string, ) => string
// 表达式
const sum1: (a1:string, b1:string) => string = (a, b) => {
  // 自动推导出a和b为string
  return a + b
}

// 可选参数 ？ 默认值 = 
const sum2:Sum = (a, b = '10') => {
  console.log(a, b)
  return '111'
}

// 剩余参数
const sum3 = (...args:number[]) => {}

sum3(1,2,3,4)

sum2('1')

// 函数重载 (声明语句)


export {}