const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //模式
  // mode: 'development', // production development
  entry:  path.resolve(__dirname, 'src/main.js'),
  output: {
    filename: 'bundle.js', // 可以配置hash: bundle.[hash:8].js
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3200,
    contentBase: './dist',
    compress: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/public/index.html'),
    })
  ]
}