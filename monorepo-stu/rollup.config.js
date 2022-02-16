import ts from 'rollup-plugin-typescript2' // 解析ts插件
import { nodeResolve } from '@rollup/plugin-node-resolve' // 解析第三方模块
import path from 'path'
// 解析json，这里主要用于解析package.json
import json from '@rollup/plugin-json'
// import serve from 'rollup-plugin-serve'

const packagesDir = path.resolve(__dirname, 'packages')
// 打包的基准目录
const packageDir = path.resolve(packagesDir, process.env.TARGET)
// // 根据packages基准目录，拼接path
const resolve = (p) => path.resolve(packageDir, p)

const pkg = require(resolve('package.json'))
const name = path.basename(packageDir)
// 对打包类型 做一个映射表， 根据提供的formats 格式化打包内容
const outputConfig = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es' // esm
  },
  'cjs': {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs' // commonjs
  },
  'global': {
    file: resolve(`dist/${name}.global.js`),
    format: 'iife' // 立即执行函数
  }
}

// 获取package中的buildOptions， 按需打包
const options = pkg.buildOptions

function createConfig(format, output) {
  output.name = options.name
  output.sourcemap = true

  // 生成rollup配置
  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      json(),
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      nodeResolve({ // 解析第三方文件
        extensions: ['.js', '.ts']
      }),
    ]
  }
}

// 导出生成的rollup配置
export default options.formats.map(format => createConfig(format, outputConfig[format]))