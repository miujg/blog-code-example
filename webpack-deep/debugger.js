// const webpack = require('webpack')
const webpack = require('./webpack/lib/webpack')
const webpackOptions = require('./webpack.config')
const compiler = webpack(webpackOptions)
debugger
compiler.run((err, stats) => {
  debugger
  console.log(stats)
})