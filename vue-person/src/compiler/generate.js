// ast语法树 =》 转换render（js代码） 字符串拼接
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // 匹配大括号 {{}}
function genProps(attrs) {
  let propsObj = attrs.reduce((prev, current) => {
    // style 到时候看
    // if(current.name === 'style') {
    //   console.log(`{${current.value}}`)
    //   prev[current.name] = JSON.parse(`{${current.value}}`)
    // } 
    prev[current.name] = current.value
    return prev
  }, { })
  return JSON.stringify(propsObj)
}

// 元素 文本各不一样
function gen(node) {
  if(node.type === 1) {
    // 处理元素
    return generate(node)
  } else {
    // 处理文本
    let text = node.text
    if(defaultTagRE.test(text)) {
      // 处理： {{name}} aa {{age}} haha
      // _v(_s(name)+"aa"+_s(age)+"haha")
      let tokens = []
      let match
      let index = 0
      // 循环正则匹配注意正则的lastIndex置为0
      let lastIndex = defaultTagRE.lastIndex = 0
      while(match = defaultTagRE.exec(text)) {
        // 匹配{{}}的左边
        index = match.index
        if(index > lastIndex) {
          // 表示: {{}} XXXX {{}} 存在中间部分的文本
          // 截取出中间部分
          tokens.push(JSON.stringify(text.slice(lastIndex, index)))
        }
        tokens.push(`_s(${match[1].trim()})`)
        // {{}}的右边
        lastIndex = index + match[0].length
      }
      // 
      if(lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
      }
      return `_v(${tokens.join('+')})`

    } else {
      // 纯文本
      return `_v(${JSON.stringify(text)})`
    }
  }
}

function genChildren(el) {
  const children = el.children
  if(children) {
    return children.map(child => gen(child)).join(',')
  }
}

export function generate(el) {
  
  let children = genChildren(el)

  let code = `_c(${JSON.stringify(el.tag)}, ${el.attrs.length? genProps(el.attrs): undefined}${
    children? `, ${children}`:''})`
  return code
}



/*
  <div id="app">
    <span style="color: red">
      {{name}} aa {{age}} haha
      <a>hello</a>
    </span>
  </div>
 */

/*
render() {
  render _c('div', {id: 'app'}, 
    _c('span', {style: 'color: red'}, 
      _s(_v(name)),
      _c('a', {},
        _v('hello')
      )
    )
  )
}
*/