import { bar } from './bar.js'

const foo = () => {
  bar() 
  console.log('foo')
}

export {
  foo
}