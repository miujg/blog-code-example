//  yarn add webpack webpack-cli webpack-dev-server vue-loader@next @vue/compiler-sfc -W  -D
// yarn add babel-loader @babel/core @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver url-loader file-loader html-webpack-plugin css-loader sass-loader style-loader sass -D -W
// yarn add gulp gulp-autoprefixer gulp-cssmin gulp-dart-sass gulp-rename -D -W
// yarn add rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-vue -D -W

// webpack 打包 udm


/** webpack 打包软连接的时候找不到模块， 至今没有找到原因  */

const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../packages/m-ui/index.ts'),
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'index.js',
    libraryTarget: 'umd', // 支持 commonjs amd, 不支持es6 可以再浏览器直接用
    library: 'm-ui'
  },
  externals: {
    vue: { // 忽略组件应用的vue，由开发者自己传入vue， 版本统一
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue'
    }
  },
  resolve: {
    alias: {
      '@m-ui': path.resolve(__dirname, '../packages'),
      'mui': path.resolve(__dirname, '../test')
    }
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}