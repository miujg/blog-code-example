const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  // 配置serve
  devServer: {
    hot: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          'css-loader', 
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    
  ],
  // 配置sourcemap
  devtool: "eval-source-map"
})