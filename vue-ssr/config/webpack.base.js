const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackLoader = require('html-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: path.resolve(__dirname, '../src/app.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue/,
        use: ['vue-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.client.html'),
      filename: 'index.client.html '
    })
  ]
}