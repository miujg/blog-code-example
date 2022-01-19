/**
 * 挂载内置插件
 */

const EntryOptionPlugin = require('./EntryOptionPlugin')

class WebpackOptionsApply {
  process (options, compiler) {
    // 注册入口插件
    new EntryOptionPlugin().apply(compiler)
    // 触发entryOptions钩子
    compiler.hooks.entryOption.call(options.context, options.entry);
  }
}

module.exports = WebpackOptionsApply