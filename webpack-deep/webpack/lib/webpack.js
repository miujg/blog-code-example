const Compiler = require("./Compiler");
const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin')
const WebpackOptionsApply = require('./WebpackOptionsApply')
const webpack = (options, callback) => {
  // 验证options是否合法

  // 创建compiler
  let compiler = new Compiler(options.context)
  compiler.options = options

  // 设置文件读写
  new NodeEnvironmentPlugin({}).apply(compiler)

  // 挂载配置文件中的plugins
  if (options.plugins && Array.isArray(options.plugins)) {
    for(const plugin of options.plugins) {
      plugin.apply(compiler)
    }
  }
  new WebpackOptionsApply().process(options, compiler)
  return compiler
}


exports = module.exports = webpack
