// arguments[0]
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // abc-aaa
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // <aaa:asdads>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>

const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的  > />

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // 匹配大括号 {{}}



function parseHTML(html) {
  while(html) {
    let textEnd = html.indexOf('<')
    if(textEnd === 0) {
      let startTagMatch = parseStartTag()
      break
    }
  }
  // 取html的n个字符(逐步删除html)
  function advance(n) {
    html = html.substring(n)
  }
  function parseStartTag() {
    // 开始标签
    let start = html.match(startTagOpen)
    if(start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)
      // 提取属性
      let end, attrs
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
}


export function compileToFunction(template) {
  // 返回一棵树（ast）
  parseHTML(template)
  return function render() {

  }
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