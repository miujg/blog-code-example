// 1.给元素绑定时间列表
// 2. 没有缓存过且value有值  绑定时间 缓存
// 3. 以前绑定过 需要移除事件 同时清缓存
// 4. 有值有缓存 重新绑定value

type Vei = {
  _vei: any
}
export const patchEvent = (el:HTMLElement & Vei, key:string, nextValue) => {
  // 对函数的缓存 韩村在el上
  const invokers = el._vei || (el._vei = {})
  const exists = invokers[key]

  // 需要绑定时间 且 之前存在 直接替换value
  if (nextValue && exists) {
    exists.value = nextValue
  } else {
    // 事件名
    const eventName = key.slice(2).toLocaleLowerCase()
    // 有值，绑定事件
    if (nextValue) {
      let invoker = invokers[key] = createInvoker(nextValue)
      el.addEventListener(eventName, invoker)
    } else {
      // 移除事件
      el.removeEventListener(eventName, exists)
      // 清空缓存
      invokers[key] = undefined
    }
  }

}

// 细品 多次绑定怎么规避
function createInvoker(value) {
  const invoker = (e) => {
    invoker.value(e)  
  }
  invoker.value = value // 随时更改value
  return invoker
}

