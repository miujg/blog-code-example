// 装饰器  =》 装饰类 类中的属性、方法 方法中的参数
// 扩展属性和方法（类）
// 为什么要有装饰器（语法糖）
// 多个装饰器 从底往上执行

@modifier
class Person {
  say!: Function
  // 装饰属性 初始化的时候执行
  @toUppcase
  name:string = 'jgmiu' // 直接走set方法
  // 传参
  @double(3)
  static age:number = 14 // 不会走set方法
  @enmuable
  getName( @params xx:string) {
    
  }
}

// 原型对象 key 函数名 index 第几个参数
function params(target:any, key:string, index:number) {
  debugger
}

function enmuable(target, key, descripter:PropertyDescriptor) {
  // Object.defineProperty 的第三个参数
  console.log(descripter)
}

function double(bs:number) { // taget 类
  return function(target:any, key) {
    let value = target[key]
    Object.defineProperty(target, key, {
      get() {
        return value*bs
      },
      set(newVal) {
        value = newVal
      }
    })
  }
}

// target 类的原型 key指属性
function toUppcase(target: any, key) {
  let value = target[key]
  Object.defineProperty(target, key, {
    get() {
      return value + '11'
    },
    set(newVal) {
      value = newVal
    }
  })
}

function modifier(target: Function) { // target就是传入的目标类
  target.prototype.say = function() {
    console.log('say')
  }
}

let person = new Person()
console.log(person)
person.say()


export {}