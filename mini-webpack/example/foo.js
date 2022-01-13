import { bar } from './bar'

const foo = () => {
  bar() 
  console.log('foo')
}

export {
  foo
}