
// https://astexplorer.net/
import fs from 'fs'
import parser from '@babel/parser'
import traverse from '@babel/traverse'


function createAsset() {
  // 获取文件(main.js)内容 
  // 获取依赖树
  // ast -> 

  const source = fs.readFileSync('./example/main.js', {
    encoding: 'utf-8'
  })

  // 获取ast
  const ast = parser.parse(source, {
    sourceType: 'module'
  })

  // 遍历ast
  traverse(ast, {
    
  })

}

createAsset()