const path = require('path')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.ts'),
  output: {
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['babel-loader', 'ts-loader']
      }
    ]
  },
  plugins: [
    new EslintWebpackPlugin({
      extensions: ['js', 'ts']
    })
  ]
}