export function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

export function def(data, key, value) {
  Object.defineProperty(data, key, {
    configurable: false,
    enumerable: false,
    value
  })
}