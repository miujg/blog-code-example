
const SingleEntryPlugin = require('./SingleEntryPlugin')

const itemToPlugin = (context, item, name) => {
	// if (Array.isArray(item)) {
  //   // 多入口
	// 	return new MultiEntryPlugin(context, item, name);
	// }
  // 单入口
	return new SingleEntryPlugin(context, item, name);
}

class EntryOptionPlugin {
  apply (compiler) {
    // 注册事件
    compiler.hooks.entryOption.tap('EntryOptionPlugin', (context, entry) => {
      itemToPlugin(context, entry, "main").apply(compiler);
    })
  }
}

module.exports = EntryOptionPlugin