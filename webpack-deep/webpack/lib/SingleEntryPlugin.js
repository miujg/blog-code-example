
class SingleEntryPlugin {
  constructor(context, entry, name) {
		this.context = context;
		this.entry = entry;
		this.name = name;
	}

  apply(compiler) {
    // 监听make事件
    compiler.hooks.make.tapAsync('SingleEntryPlugin', (compilation, callback) => {
      const { context, entry, name } = this
      console.log('make', context, entry, name)
      // 从此入口开始编译
      // compilation.addEntry(context, entry, name)
    })
  }

}

module.exports = SingleEntryPlugin