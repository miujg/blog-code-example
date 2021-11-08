const path = require('path')
const HtmlWebpackPlguin = require('html-webpack-plugin')
module.exports = {
  entry: path.resolve(process.cwd(), './src/index.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(process.cwd(), './dist')
  },
  plugins: [
    new HtmlWebpackPlguin({
      template: path.resolve(process.cwd(), './public/index.html')   
    })
  ]
}