import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  // 入口
  input: 'src/index.js',
  output: {
    file: 'dist/umd/vue.js',
    // 指定打包后全局变量的名字
    name: 'Vue',
    // 统一模块规范
    format: 'umd',
    // 方便调试
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    serve({
      open: true,
      openPage: '/public/index.html',
      port: 3002,
      contentBase: ''
    })
  ]
}