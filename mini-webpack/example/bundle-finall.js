
// 最终打包结果
(function (modules) {
  function require (id) {
    const [fn, mapping] = modules[id]
    const module = {
      exports: {}
    }
    const loacalRequire = (filePath) => {
      const id = mapping[filePath]
      return require(id)
    }
    fn(loacalRequire, module, module.exports)
    return module.exports
  }
  require(0)
})(
  {
    0: [function (require, module, exports) {
      const { foo } = require('./foo.js')
      foo()
      console.log('main')
    }, {'./foo.js': 1}],
    1: [function (require, module, exports) {
      const { bar } = require('./bar.js')
    
      const foo = () => {
        bar() 
        console.log('foo')
      }
    
      module.exports = {
        foo
      }
    }, {'./bar.js': 2}],
    2: [function (require, module, exports) {
      const bar = () => {
        console.log('bar')
      }
      
      module.exports = {
        bar
      }
    }, {}]
  }
)