import ts from 'rollup-plugin-typescript2' // 解析ts插件
import { nodeResolve } from '@rollup/plugin-node-resolve' // 解析第三方模块
import serve from 'rollup-plugin-serve'
import path from 'path'

export default {
  input: 'src/index.ts',
  output: {
    // amd iife commonjs umd...
    // umd 全局变量
    // iife 自执行函数
    format: 'iife',
    file: path.resolve('dist/bundle.js'),
    sourcemap: true
  },
  plugins: [
    nodeResolve({ // 解析第三方文件
      extensions: ['.js', '.ts']
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    serve({
      openPage: path.resolve(__dirname, './public/index.html'),
      contentBase: '',
      port: 8080
    })
  ]
}
