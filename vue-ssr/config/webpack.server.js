const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

// 服务端 给node
module.exports = merge(base, {
  mode: 'development',
  entry: {
    server: path.resolve(__dirname, '../src/server.entry.js')
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      filename: 'index.ssr.html',
      minify: false,
      // 服务端html 不需要引入js
      excludeChunks: ['server']
    }),
    new VueSSRServerPlugin()
  ]
})