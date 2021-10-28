// 接口 描述对象的形状 根据接口 提供一些新的类 为别人使用

// interface && type区别
// interface 可以被实现 可以被继承
// type 可以写联合类型
// 总结：能用接口用接口，不能在用type。 短的建议用type，长得用interface

// 1）描述对象

// 2)描述函数
// 混合类型
interface ICount {
  // 描述函数
  ():number,
  // 描述属性
  count:number
}
const fn:ICount = () => {
  return ++fn.count
}
fn.count = 0



// 2)接口的扩展
// 当实际的值得属性多余接口定义的属性时。
// a as类型断言
// b 同名多个接口合并
// c 接口继承（扩展）
// ？可选属性 readonly 仅读属性
// 任意属性 [key:string]: any
interface IPerson {
  name: string
  age: number
  eName?: string
  readonly address: string
  [key:string]: any // 限制死key为string 其他随意
}

const p1:IPerson = {
  name: 'xx',
  age: 10,
  address: 'china',
  test: 11
}

// 如果接口中[xxx:index] 可索引属性
interface IArr {
  [key:number]:any
}

let arr:IArr = [1, 'x', true]
let arr1:IArr = {1: 1, 2: 'xx', 3: true}

// --------------------------------------

// 3) 接口可以被类实现
interface ISpeckable { 
  name:string,
  // 描述类的原型方法 
  // 这里的void不是表示返回为空，而表示不关心(只是在类里面是这样)
  speck():string
}
interface IChineseSpeackable {
  speckChinese(): void
  speck():string
}

// 实现两个接口，同名函数冲突。要保证一样，不然会报错
class Speck implements ISpeckable, IChineseSpeackable {
  speckChinese(): void {
    throw new Error("Method not implemented.")
  }
  name!: string
  speck(): string {
    return 'xx'
  }
}

// 类 抽象类（不能被实例化）, 用于被继承（子类必须实现父类的所有抽象方法）
// 包含抽象方法和抽象属性，也可以包含可实现方法(与接口的区别)
// 单继承，接口可以实现多个
abstract class Animal {
  abstract name:string
  eat() {
    console.log('eat')
  }
}

// 可以描述对象（实例） 函数 类

class Car {
  constructor(public name: string) {
    this.name = name
  }
}

interface IClass<T> {
  // 描述实例，接口一个name 返回一个Car的实例
  new (name: string):Car
}

function createClass<T>(clazz:IClass<T>, name:string) {
  return new clazz(name)
}

let result:Car = createClass<Car>(Car, 'benzi')
 
// 以上的createClass有一个局限 只能生成Car. 泛型的引出

export {}