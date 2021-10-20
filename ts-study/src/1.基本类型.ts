// ts 中的类型

// 1.基础文件

// 数字 字符串 布尔 

// 元祖：长度和个数（内容存放类型）都限制好了
let tuple:[string, number, boolean] = ['xx', 111, false]

// 不能通过索引添加内容
// 只能放入元祖中已经声明的类型
tuple.push(true)
tuple.push(false)

// 数组 存放一种类型的集合
let arr:number[] = [1, 2]
// 存放多种类型 可以通过联合类型来实现
let arr1:(number|string)[] = [1, '1']
// 泛型
let arr2:Array<number | string> = [1, '1']

// 枚举类型
enum USER_ROLE {
  USER, // 默认从0开始
  ADMIN
}
// 可以正向 也可以反举
console.log(USER_ROLE.USER, USER_ROLE[0])

// 异构枚举 枚举中放不同类型
enum TOKEN {
  // 异构 不能反举
  NOT_FOUND = 'a', // 默认从0开始
  ERROR = 0,
  // 自动推断为1
  FIREEN
}

console.log(TOKEN.NOT_FOUND, TOKEN[1])

// 常量枚举 只是提供一个类型 （减少代码）
const enum TEST {
  A
}
// 不能反举
console.log(TEST.A)

/* 
  null undefined(任何类型的子类型， 可以讲其赋值给任意类型, 
  严格模式下只能讲null赋值给null，undefined赋值给undefined)
 */

// void 空类型， 只能接受null和undefined，通常用于函数返回值
// 严格某事下 void不能接受null

// never类型 永远不 是任何类型的子类型 把never赋值给任意类型
// 永远达不到的有三种情况： 1. 错误 2. 死循环 3. 类型判断时会出现nerver
// 用途 1.标识错误 2.完整性
function MyError():never {
  throw new Error('')
}
function whileTrue():never {
  while(true){}
} 
function byType(val: string|number) {
  if(typeof val == 'string') {
    val
  } else if(typeof val == 'number') {
    val
  } else {
    // never
    val
  }
}
let n:never = whileTrue()

// Symbol BigInt 几乎用不到
// BigInt 用于操作超出js数字范围的数字 js自带

// 对象类型 非原始数据类型 引用类型 object


// 问题：什么时候标识类型，什么时候不用标识类型
// ts自带类型推导（1.初始化进行类型推导），能自己正确推导出类型的时候

// 问题： string String区别  拆箱 装箱
// 类也是一种类型 可以描述其实例和基本类型
// 11..toString ===11.0.toString  一个小数点会认为后面是小数点的东西
let number1:number = 11
let number2:number = 11
// let number3:number = new Number(11) 报错 只能
let number4:number = 11


export {} // 防止模块的干扰