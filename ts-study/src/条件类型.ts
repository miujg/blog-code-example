// ts中的类型兼容性，一个类型能够赋值给另一个类型
// 从安全的角度考虑

// 1. 基本数据类型的兼容性
let str!:string
let temp:string | number
// 从安全性考虑 temp = str可以  str = temp不行万一是个number呀

// 2. 鸭子类型检测 结构 只要长得像就可以
// 我要得你有

interface MyNum {
  toString():string
}

// 之所以可以赋值是因为，MyNum要求有toString方法，而字符串‘xxx’刚好有
let str2:MyNum = 'xxx'
// 报错。str2只有toString，而str3要字符串的所有方法。
// let str3:string = str2



// ------------------------------- 条件类型 ------------------------------
// 条件：三元表达式 能判断
// ts中有很多内置类型，

interface Bird {
  name:string
  a:number
}

interface Sky {
  sky:string
}

interface Fish {
  name:string
}

interface Swiming {
  swim:string
}

// 条件类型 三元表达式（ts中的语法）
type MyType<T> = T extends Bird? Sky : Swiming

// x 推导出来是Sky
type X = MyType<Bird>

type Animal = {
  name:string
  a:number,
  // 多一个也没关系
  b:string
}

// 这里还是能推导出Sky, 因为ts认为Animal继承了Bird， 只要满足就行，多了也没关系
// 还是那句话，我要得，你都有
type Y = MyType<Animal>

// 条件分发
// => Bird|Fish extends Bird? Sky : Swiming  ==> Sky | Swiming(取联合类型)
// 只有联合类型进行分发
type Z = MyType<Bird | Fish>

// 对于交叉类型
// Bird & Fish 既有Bird 也有 Fish 肯定满足 extends Bird
// ==》 推导出Sky
type A = MyType<Bird & Fish>

// 交叉是缩小范围了

// 帅
interface P1 {
  handsome:string
}

// 高
interface P2 {
  hight:string
}

// 又高又帅 这不范围就缩小了？？
type P3 = P1 & P2


// ------------------------------- 内置类型(基于条件分发) ------------------------------

// Exclude<T, U>类型的排除 T类型排除U
// 推导出stirng
type MyExclude1 = Exclude<string|boolean, boolean>
// 实现这个功能 
// 利用联合类型的分发机制
// 此处的extends不要理解继承，是泛型约束
type MyExclude<T, U> = T extends U? never:T
// R 推导出string
type R = MyExclude<string|boolean, boolean>


// 非null检测
// 判处null
type MyNonNullable1 = NonNullable<string|number|null|boolean>
type MyNonNullable<T> = T extends null | undefined? never:T
type MyNonNullable2 = MyNonNullable<string|number|null|boolean>

// ------------------------------- 类型推导 infer(内置关键字) ------------------------------

// 1. 推导函数返回值(不执行函数 得到类型)
function getUser(name:string, age:number) {
  return {name: 'zf', age: 11}
}

type MyRetrunType1 = ReturnType<typeof getUser>
// 首先约束泛型为函数
// infer R 推导一下R
// infer 放在哪里 就表示推导哪里
// 是函数就把R返回
type MyRetrunType<T extends (...args:any[]) => any> = T extends (...args:any[]) => infer R? R : never
type MyRetrunType2 = MyRetrunType<typeof getUser>

// 2.推导参数
type Par = Parameters<typeof getUser>
type MyParamsType<T extends (...args:any[]) => any> = T extends (...args:infer R) => any? R : never
type Par1 = MyParamsType<typeof getUser>

// 3. 取构造函数参数
class Car {
  constructor(name:string) {}
}
type MyConstructorParameters<T extends {new (...args:any[]):any}> = T extends {new (...args: infer R):any} ? R : never
type C = ConstructorParameters<typeof Car>
type C1 = MyConstructorParameters<typeof Car>

export {}