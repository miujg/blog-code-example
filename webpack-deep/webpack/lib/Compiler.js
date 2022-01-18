
// const { Tapable } = require("tapable")
class Compiler {
  constructor (context) {
    // super()
    this.context = context
    // 钩子函数
    this.hooks = {
      // 当编译完成之后触发
      // done: new AsyncSeriesHook(["stats"])
    }
  }
  run (callback) {
    console.log('Compiler run')
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