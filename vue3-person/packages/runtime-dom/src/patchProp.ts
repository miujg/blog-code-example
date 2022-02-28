// 属性

import { patchAttr } from "./modules/attr"
import { patchClass } from "./modules/class"
import { patchEvent } from "./modules/events"
import { patchStyle } from "./modules/style"

export const patchProp = (el, key, prevValue, nextValue) => {
  switch (key) {
    case 'class':
      patchClass(el, nextValue)
      break
    case 'style':
      patchStyle(el, prevValue, nextValue)
      break
    default:
      // 不是事件 才是attr
      if (/^on[^a-z]/.test(key)) {
        patchEvent(el, key, nextValue)
      } else {
        patchAttr(el, key, nextValue)
      }

  }
}