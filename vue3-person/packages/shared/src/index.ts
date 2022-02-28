export const isObject = (value) => typeof value === 'object' && value !== null
export const extend = Object.assign
export const isArray = Array.isArray
export const isFunction = value => typeof value == 'function'
export const isNumber = value => typeof value == 'number'
export const isString = value => typeof value == 'string'
// 判断是否是数字类型的索引
export const isIntergetKey = key => parseInt(key) + '' === key
export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)
export const hasChanged = (oldValue, newValue) => oldValue !== newValue 
export * from './shapeFlag'