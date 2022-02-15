
// https://astexplorer.net/
import fs from 'fs'
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import path from 'path'
import ejs from 'ejs'
import { transformFromAst } from 'babel-core'

let id = 0

function createAsset(filePath) {
  // 获取文件(main.js)内容 
  // 获取依赖树
  // ast -> 

  const source = fs.readFileSync(filePath, {
    encoding: 'utf-8'
  })

  // 获取ast
  const ast = parser.parse(source, {
    sourceType: 'module'
  })

  const dep = []
  // 遍历ast，
  traverse.default(ast, {
    // 获取 import
    ImportDeclaration({node}) {
      // esm => common
      dep.push(node.source.value)
    }
  })

  const { code } = transformFromAst(ast, null, {
    presets: ['env']
  })

  return {
    filePath,
    code,
    dep,
    mapping: {},
    id: id++
  }
}


// 生成图结构
function createGraph () {
  const mainAsset = createAsset('./example/main.js')

  const queue = [mainAsset]

  for (const asset of queue) {
    asset.dep.forEach(relativePath => {
      const child = createAsset(path.resolve('./example', relativePath))
      asset.mapping[relativePath] = child.id
      queue.push(child)
    });
  }
  return queue
}

// 基于graph -》 bundle （模板生成器ejs）

function build (graph) {

  const template = fs.readFileSync('./example/bundle.ejs', {encoding: 'utf-8'})
  const source = ejs.render(template, {data: graph})
  fs.writeFileSync('./dist/bundle.js', source)
}



const graph = createGraph()

build(graph)
