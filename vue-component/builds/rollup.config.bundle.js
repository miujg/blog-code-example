// 全量打包

import typescript from "rollup-plugin-typescript2"
import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
import { getPackagesSync } from '@lerna/project'
import vue from 'rollup-plugin-vue'

export default {
  input: path.resolve(__dirname, '../packages/m-ui/index.ts'),
  output: {
    format: 'es',
    file: 'lib/index.esm.js'
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
  }
}