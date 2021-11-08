const path = require('path')
const HtmlWebpackPlguin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  entry: path.resolve(process.cwd(), './src/index.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(process.cwd(), './dist')
  },
  plugins: [
    new HtmlWebpackPlguin({
      template: path.resolve(process.cwd(), './public/index.html'),
      inject: 'body'
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue/,
        exclude: /node_modules/,
        use: 'vue-loader'
      },
      {
        test: /\.csss$/,
        use: [
          'style-loader', 'css-loader'
        ]
      }
    ]
  }
}