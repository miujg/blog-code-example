// 重点： 原型 实例 静态 super 属性访问器

// 类 es6 静态属性（类调用） 私有的实例属性（实例调用） 原型属性（实例共享）

// as 断言成 xxx
// ！ 非空判断
// ? 链判断 最安全


// 类的修饰符: public private protected readonly
// public 自己 子类 外面都可以
// protected 自己 子类 外面不可以
// privete 仅自己

// 如果constructor 被标识为 private 不能被继承 protected 不能被new

// readonly 表示此属性不能被更改。初始化之后就不可更改，父类赋值之后，子类就不能改
// 也可以理解为 仅能在constructor中改
class Animal {
  name!:string
  constructor(name) {
    this.name = name 
  } 
  // 静态属性与方法，可以被继承
  static say() {
    console.log('animal')
  }
}

class Cat extends Animal {
  private age!:number
  constructor(name:string, age) {
    super(name)// 父类
    this.age = age
  }
  static say() {
    super.say() // super父类的原型对象
    console.log('cat')
  }
  // 属性访问器 相当于原型属性 使用了Object.defineProperty
  get eat() {
    return '吃'
  }

  private _weight:number = 0
  // 访问器暴露私有属性 
  get weight() {
    return this._weight
  }
  set weight(newVal) {
    this._weight = newVal
  }

}

const tom = new Cat('tom1', 12)
tom.weight = 10
console.log(tom.weight)

export {}