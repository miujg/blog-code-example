const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    hot: true,
    port: 3003
  }
})