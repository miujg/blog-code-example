import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import liverreload from 'rollup-plugin-livereload'

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
    liverreload(),
    babel({
      exclude: 'node_modules/**'
    }),
    process.env.ENV === 'development' ? serve({
      open: true,
      openPage: '/public/index.html',
      port: 3001,
      contentBase: ''
    }) : null
  ]
}