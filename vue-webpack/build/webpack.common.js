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
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 这里的单位是byte 字节
              limit: 200 * 1024,
              // 输出到相应的目录
              outputPath: "img/",
              // 图片可以单独加域名
              // publicPath: '',
              // 防止图片导入为一个对象
              esModule: false,
            }
          }
        ]
      }
    ]
  }
}