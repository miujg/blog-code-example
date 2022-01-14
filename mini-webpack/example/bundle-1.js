
// 最终打包结果草案

function require (filePath) {
  const map = {
    './main.js': mainjs,
    './foo.js': foojs,
    './bar.js': barjs
  }
  const fn = map[filePath]
  const module = {
    exports: {}
  }
  fn(require, module, module.exports)
  return module.exports
}

function mainjs (require, module, exports) {
  const { foo } = require('./foo.js')
  foo()
}

function foojs (require, module, exports) {
  const { bar } = require('./bar.js')

  const foo = () => {
    bar() 
    console.log('foo')
  }

  module.exports = {
    foo
  }
}

function barjs (require, module, exports) {
  const bar = () => {
    console.log('bar')
  }
  
  module.exports = {
    bar
  }
}

require('./main.js')

console.log('xxx')