// 不能直接 el.style = newStyle domapi决定

export const patchStyle = (el:HTMLElement, prevValue, nextValue) => {
  const style = el.style
  if (nextValue == null) {
    el.removeAttribute('style')
  } else {
    // 老的里面有没有新的
    // 新的里面赋值到style
    if (prevValue) {
      for(let key in prevValue) {
        if (nextValue[key] == null) { //老的有 新的没有 老的删除
          style[key] = ''
        }
      }
    }
    for (let key in nextValue) {
      style[key] = nextValue[key]
    }
  }
}