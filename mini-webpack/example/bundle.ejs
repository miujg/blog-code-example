
// 最终打包结果
(function (modules) {
  function require (filePath) {
    const fn = modules[filePath]
    const module = {
      exports: {}
    }
    fn(require, module, module.exports)
    return module.exports
  }
  require('./main.js')
})(
  {
    './foo.js': function (require, module, exports) {
      const { bar } = require('./bar.js')
    
      const foo = () => {
        bar() 
        console.log('foo')
      }
    
      module.exports = {
        foo
      }
    },
    './bar.js': function (require, module, exports) {
      const bar = () => {
        console.log('bar')
      }
      
      module.exports = {
        bar
      }
    },
    './main.js': function (require, module, exports) {
      const { foo } = require('./foo.js')
      foo()
      console.log('main')
    }
  }
)