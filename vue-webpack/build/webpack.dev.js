const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  // 配置serve
  devServer: {
    hot: true,
    port: 8080
  },
  // 配置sourcemap
  devtool: "eval-source-map"
})