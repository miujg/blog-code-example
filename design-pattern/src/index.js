// 设计模式核心：观察逻辑的变与不变，分离变与不变，达到变化的部分灵活、不变的部分稳定的效果

// 开放封闭原则的内容：对拓展开放，对修改封闭。

// 简单工厂模式：
// 构造器模式 ==> 关注的是实例之间的变与不变
// 工厂模式 ==> 构造函数（类）之间的变与不变

// 抽象工厂模式：

// 功能要点：

// 学会用 ES6 模拟 JAVA 中的抽象类；
// 了解抽象工厂模式中四个角色的定位与作用；
// 对“开放封闭原则”形成自己的理解，知道它好在哪，知道执行它的必要性


// -------------------- 单例模式 ----------------------------
// 保证一个类仅有一个实例，并提供一个访问它的全局访问点，这样的模式就叫做单例模式。


class Person {
  constructor () {
    if (Person.instance) {
      return Person.instance
    }
    Person.instance = this
  }
  static instance = null
}

// ------ 单例模式实践 ----------------

// Storage对象的实现， 静态方法版本 闭包版
// 全局模态框的实现

function SingleDog() {

}

SingleDog.getInstance = (function() {
  let instance = null
  return function() {
    if (!instance) new SingleDog()
    return instance
  }
})()

let s1 = SingleDog.getInstance()
let s2 = SingleDog.getInstance()
console.log(s1 === s2)
