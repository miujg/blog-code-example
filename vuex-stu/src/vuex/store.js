import { applyMixin } from './mixin'

export class Store {
  constructor(options) {
    console.log(options)
  }
}

export const install = applyMixin
