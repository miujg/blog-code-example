const path = require('path')
const HtmlWebpackPlguin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = {
  entry: path.resolve(process.cwd(), './src/index.ts'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(process.cwd(), './dist')
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'ts', 'vue'],
      exclude: ['node_modules']
    }),
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
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset'
        // type: 'javascript/auto',
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       // 这里的单位是byte 字节
        //       limit: 200 * 1024,
        //       // 输出到相应的目录
        //       // outputPath: "img/",
        //       // 图片可以单独加域名
        //       // publicPath: '',
        //       // 防止图片导入为一个对象
        //       esModule: false,
        //     }
        //   }
        // ]
      }
    ]
  },
  resolve: {
    alias: {
      assets: path.resolve(process.cwd(), './src/assets'),
      '@': path.resolve(process.cwd(), './src')
      // asserts: path.resolve(__dirname, '../src/assets')
    }
  }
}