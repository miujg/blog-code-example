import { parseHTML } from './parse'
import { generate } from './generate'

export function compileToFunction(template) {
  // template ==> htmlAST
  let ast = parseHTML(template)
  // htmlAST ==> render
  let code = generate(ast)
  // with 欺骗作用域
  let render = `with(this){return ${code}}`
  // eval 不干净的执行 词法作用域无法像函数那样动态
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