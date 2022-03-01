import { hasOwn } from "@vue/shared"

export const PublicInstanceProxyHandlers = {
  get ({ _: instance }, key) {
    // 取值 可以 代理访问  data props setup
    const { props, setupState, data } = instance
    // 不能访问$开头的
    if (key[0] === '$') return
    if (hasOwn(setupState, key)) {
      return setupState[key]
    } else if (hasOwn(props, key)) {
      return props[key]
    } else if (hasOwn(data, key)) {
      return data[key]
    }
    return undefined
  },
  set ({ _: instance }, key, value) {
    const { props, setupState, data } = instance
    if (hasOwn(setupState, key)) {
      setupState[key] = value
    } else if (hasOwn(props, key)) {
      props[key] = value
    } else if (hasOwn(data, key)) {
      data[key] = value
    }
    return true
  }
}