function convert (obj) {
  // Object.keys获取对象的所有key值，通过forEach对每个属性进行修改
  Object.keys(obj).forEach(key => {
    // 保存属性初始值
    let internalValue = obj[key]
    Object.defineProperty(obj, key, {
      get () {
        console.log(`getting key "${key}": ${internalValue}`)
        return internalValue
      },
      set (newValue) {
        console.log(`setting key "${key}" to: ${newValue}`)
        internalValue = newValue
      }
    })
  })
}