
import { forEachValue } from '../utils'
import Module from './module'

export default class ModuleCollection {
  constructor(options) { 
    this.root = null
    this.register([], options)
  }
  // 遍历 递归 格式化 path
  register(path, rootModule) {
    let newModule = new Module(rootModule)
    if (path.length == 0) {
      this.root = newModule
    } else {
      let parent = path.slice(0, -1).reduce((prev, current) => {
        return prev.getChild(current)
      }, this.root)
      parent.addChild(path[path.length - 1], newModule)
    }
    if(rootModule.modules) {
      forEachValue(rootModule.modules, (module, moduleName) => {
        this.register(path.concat(moduleName),module)
      })
    }
  }
}
