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



export {}