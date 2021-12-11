export function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

export function def(data, key, value) {
  Object.defineProperty(data, key, {
    configurable: false,
    enumerable: false,
    value
  })
}

export function proxy(vm, key) {
  
}


let callbacks = []
let waiting = false
// 批处理 第一次开定时器，后续只更新列表 之后清空逻辑
function flushCallbacks() {
  callbacks.forEach(callback => {
    callback()
  })
  waiting = false
  callbacks = []
}

export function nextTick(cb) {
  callbacks.push(cb) // 默认的cb是渲染逻辑 用户逻辑放在渲染逻辑之后

  // 类似于开一个定时器， 异步任务通道存放任务, 执行多次 开几个定时器 导致重复运行，需要flag
  // 事件循环 微任务
  // waiting 相当于一个锁
  if(!waiting) {
    waiting = true
    Promise.resolve().then(flushCallbacks)
  }
}

// 策略合计
const LIFECYCLE_HOOKS = ['beforeCreate', 'created']
const strats = {}

function mergeHook(parentVal, childVal) {
  if(childVal) {
    if(parentVal) {
      return parentVal.concat(childVal)
    } else {
      // 儿子有 父亲没有 
      return [childVal]
    }
  } else {
    // 儿子没有直接用父亲
    return parentVal
  }
}

// 生命周期合并
LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

// 组件合并
strats.components = function(parentVal, childVal) {
  // 原型链
  const res = Object.create(parentVal)
  if(childVal) {
    for(let key in childVal) {
      res[key] = childVal[key]
    }
  }
  return res
}

// 合并
export function megerOptions(parent, child) {
  const options = {}
  // 1. 父亲有的 儿子也有 用儿子
  // 2. 父亲有值 儿子没有 用父亲
  // 3. 自定义策略 
  for(let key in parent) {
    mergeField(key)
  }

  for(let key in child) {
    if(!parent.hasOwnProperty(key)) {
      mergeField(key)
    }
  }
  
  function mergeField(key) {
    // 策略模式
    if(strats[key]) {
      return options[key] = strats[key](parent[key], child[key])
    }
    if(isObject(parent[key]) && isObject(child[key])) {
      options[key] = {...parent[key], ...child[key]}
    } else {
      if(child[key]) {
        options[key] = child[key]
      } else {
        options[key] = parent[key]
      }
    }
  }
  return options
}

function makeUp(str) {
  const map = {}
  str.split(',').forEach(tagName => {
    map[tagName] = true
  })
  return tag => map[tag] || false
}

export const isReservedTag = makeUp('a,p,div,ul,li,span,input,button,pre')


