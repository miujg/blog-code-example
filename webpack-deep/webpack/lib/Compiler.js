
const { Tapable, SyncBailHook, AsyncParallelHook, SyncHook, AsyncSeriesHook } = require("tapable")
class Compiler extends Tapable {
  constructor (context) {
    // super()
    this.context = context
    // 钩子函数
    this.hooks = {
      // 当编译完成之后触发
      // done: new AsyncSeriesHook(["stats"])，
      // 处理入口文件的钩子
      // context项目根目录绝对路劲 entry项目入口文件
      entryOption: new SyncBailHook(["context", "entry"]),
      // 运行前
      beforeRun: new AsyncSeriesHook(["compiler"]),
      // 运行
      run: new AsyncSeriesHook(["compiler"]),
      // 开始编译
      beforeCompile: new AsyncSeriesHook(["params"]),
       // make钩子 异步并行钩子
      make: new AsyncParallelHook(['compilation']),
      // 编译后
      afterCompile: new AsyncSeriesHook(["compilation"]),
      compilation: new SyncHook(["compilation", "params"]),
    }
  }
  run (callback) {
    console.log('Compiler run')
    // 最终回调
    const finalCallbak = (err, stats) => {
      callback(err, stats)
    }
    const onCompiled = (err, compilation) => {
      console.log('onCompiled')
      finalCallbak(err, stats)
    }
    callback(null, {
       toJson () {
         return {
           // 过滤
           entries: [], // 入口
           chunks: [], // 代码块
           module: [], // 模板
           assets: [] // 资源
         }
       }
    })
  }
}

module.exports = Compiler