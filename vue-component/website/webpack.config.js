//  yarn add webpack webpack-cli webpack-dev-server vue-loader@next @vue/compiler-sfc -W  -D
// yarn add babel-loader @babel/core @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver url-loader file-loader html-webpack-plugin css-loader sass-loader style-loader sass -D -W
// yarn add gulp gulp-autoprefixer gulp-cssmin gulp-dart-sass gulp-rename -D -W

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'main.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".vue"]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // https://webpack.docschina.org/configuration/module#resolve-fully-specified
        test: /\.(t|j|mj)s$/,
        include: path.resolve(__dirname, '../node_modules/element-plus'),
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(svg|otf|ttf|woff|woff2|eot|gif|png)$/i,
        // 详情查看webpack资源模块：https://webpack.docschina.org/guides/asset-modules/
        type: 'asset/resource'
        // loader: 'url-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html')
    })
  ]
}