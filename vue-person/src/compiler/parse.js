/**
 * 解析html 只解析核心代码  不包括注释 什么的
 * 不考虑自闭和标签
 * template ===> 语法树
 * 值得细细品
 */

// 所需正则
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // abc-aaa
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // <aaa:asdads>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>

const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的  > />


export function parseHTML(html) {
  // 语法树解析
  let root = null
  let currentParent
  // 用栈的方式来生成语法树
  let stack = []
  function createASTElement(tag, attrs) {
    // vue3里面支持多个根元素（外层包一个空元素）vue2 空元素
    return {
      tag,
      type: 1,
      children: [],
      attrs,
      parent: null
    }
  }
  
  // 根据开始标签 结束标签 文本内容 生成 ast
  function start(tagName, attrs) {
    let element = createASTElement(tagName, attrs)
    if(!root) {
      root = element
    }
    // 记住父元素 
    currentParent = element
    stack.push(element)
  }
  
  function chars(text) {
    text = text.replace(/\s/g, '')
    if(text) {
      currentParent.children.push({
        type: 3,
        text
      })
    }
  }
  
  function end(tagName) { 
    let element = stack.pop()
    currentParent = stack[stack.length - 1]
    if(currentParent) {
      currentParent.children.push(element)
    }
  }
  // 前进 逐个删除html的n个字符
  function advance(n) {
    html = html.substring(n)
  }
  
  function parseStartTag() {
    // 开始标签 <div   div
    let start = html.match(startTagOpen)
    if(start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)
      // 提取属性
      let end, attrs
      // end 判断有没有解析结束即：>, attrs 匹配属性 
      while(!(end = html.match(startTagClose)) && (attrs = html.match(attribute)) ) {
        advance(attrs[0].length)
        match.attrs.push({
          name: attrs[1],
          value: attrs[3] || attrs[4] || attrs[5]
        })
      }
      if(end) {
        advance(end[0].length)
        return match
      } 
    }
    
  }

  while(html) {
    // 判断是否是开始标签
    let textEnd = html.indexOf('<')
    if(textEnd === 0) {
      let startTagMatch = parseStartTag()
      if(startTagMatch) {
        // 匹配完开始标签，跳出循环
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }
      // 匹配结尾标签 并删除
      let endTagMatch = html.match(endTag)
      if(endTagMatch) {
        advance(endTagMatch[0].length)
        end(endTagMatch[0] )
        continue
      }
    }
    let text
    if(textEnd > 0) {
      text = html.substring(0, textEnd)
    }
    if(text) {
      // 文本
      advance(text.length)
      chars(text)
    }
  }
  return root
}


// 思路
{/* <div id="app">
  <p>hello</p>
</div>

let root = {
  tag: 'div',
  attrs: [{name: 'id', value: 'app'}],
  parent: null,
  type: 1
  children: [
    {
      tag: 'p',
      attrs: [],
      parent: null,
      type: 1,
      childredn: [
        {
          text: 'hello',
          type: 3
        }
      ]
    }
  ]
} */}