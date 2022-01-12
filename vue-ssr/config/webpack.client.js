const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')


module.exports = merge(base, {
  mode: 'development',
  entry: {
    client: path.resolve(__dirname, '../src/client.entry.js')
  },
  devServer: {
    hot: true,
    port: 3003
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.client.html'),
      filename: 'index.client.html',
      minify: false
    }),
    new VueSSRClientPlugin()
  ]
})