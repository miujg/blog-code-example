import { parseHTML } from './parse'
import { generate } from './generate'

export function compileToFunction(template) {
  let ast = parseHTML(template)
  let code = generate(ast)
  // with 欺骗作用域
  let render = `with(this){return ${code}}`
  let fn = new Function(render)
  return fn
}


// with(this){
//   return _c( div, 
//     {"id":"app","class":"app-wrapper","style":"color: red"}, 
//     _c(span, {"style":"color: red"}), 
//     _v(_s(name)+"aa"+_s(age)+"haha"),
//     _c(a, undefined), 
//     _v("hello"))))
// }