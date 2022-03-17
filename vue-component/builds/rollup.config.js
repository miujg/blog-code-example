// 单个打包

import typescript from "rollup-plugin-typescript2"
import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
import { getPackagesSync } from '@lerna/project'
import vue from 'rollup-plugin-vue'

// 获取packages下的所有package.json
const inputs = getPackagesSync().map(pck => pck.name).filter(name => name.includes('@m-ui'))

export default inputs.map(name => {
  const pckName = name.split('@m-ui/')[1]
  return {
    input: path.resolve(__dirname, `../packages/${pckName}/index.ts`),
    output: {
      format: 'es',
      file: `lib/${pckName}/index.js`
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
          ],
          compilerOptions: {
            declaration: false
          }
        }
      })
    ],
    external(id) { // 排除vue 自己写的包 都排除调
      return /^vue/.test(id) || /^@m-ui/.test(id)
    }
  }
})