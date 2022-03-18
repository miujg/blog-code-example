// 全量打包

import typescript from "rollup-plugin-typescript2"
import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
import vue from 'rollup-plugin-vue'

export default {
  input: path.resolve(__dirname, '../packages/m-ui/index.ts'),
  output: {
    name: 'MUI',
    format: 'umd',
    file: 'lib/index.umd.js',
    // umd 或 iife 的情况下生效
    globals: {
      // umd的vue3全局变量为Vue， 所以要将vue重名为Vue
      vue: 'Vue'
    }
  },
  plugins: [
    nodeResolve(),
    vue({
      target: 'browser'
    }),
    typescript({ // 默认使用tsconfig.json
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      tsconfigOverride: {
        exclude: [
          'node_modules',
          'website'
        ]
      }
    })
  ],
  external(id) { // 排除vue
    return /^vue/.test(id)
  },
}