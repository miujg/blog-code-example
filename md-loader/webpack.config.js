
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  // 入口
  entry: path.resolve(__dirname, './src/index.js'),
  // 出口
  output: {
    path: path.resolve(__dirname, './dist')
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    })
  ],
  // 本地服务
  devServer: {
    hot: true,
    port: 8080
  },
  devtool: 'eval-source-map',
}