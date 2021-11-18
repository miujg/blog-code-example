export function isObject() {
  return typeof obj === 'object' && obj !== null
}

// 代理data this.data.xx ===> this.xx
export function proxy(vm, data) {
  // Object.keys(data).forEach(key => {
  //   Object.defineProperty(vm, key, {
  //     get () {
  //       return data[key]
  //     },
  //     set (val) {
  //       data[key] = val
  //     }
  //   })
  // })
  // Object.keys(vm._data).forEach(key => {
  //   Object.defineProperty(vm, key, {
  //     get() {
  //       return vm._data[key]
  //     },
  //     set(val) {
  //       vm._data[key] = val
  //     }
  //   })
  // })
}