// 重写数组方法
// 装饰模式
// push shift unshift pop reverse sort splice 导致数组本身发生变化

const oldArrayMethods = Array.prototype
export const arrayMethods = Object.create(oldArrayMethods)