import { test } from './a.js'

test()
console.log(module.hot)
if (module.hot) {
  module.hot.accept('./a.js', function() {
    console.log('Accepting the updated printMe module!');
    test();
  })
}