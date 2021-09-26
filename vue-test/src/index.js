// vue响应式原理 数据劫持（对象劫持、数组劫持）
// 创建Object类主要用于数据的劫持
// Object.defineProperty 重写对象属性的get set
// 如果对象数组很复杂，递归劫持
// 对于数组 不劫持她的索引get set 要重写（拦截）数组的一些操作方法

import { observe } from "./observe"


const data = {
  // name: 'jgmiu',
  // age: 26,
  friends: [
    {name: 'jackson', age: 25}, {name: 'pual', age: 30}, {name: 'pual', age: 30}
  ],
  // school: {
  //   name: '重交',
  //   address: '南岸-七公里'
  // }
}
observe(data)
// 这种 school的setter 并不可以拦截 这是vue的一个弊端
// data.school.type = '本科'
// data.friends[0] = {}

data.friends.push({name: 'jgmiu', age: 31})

console.log(data)


