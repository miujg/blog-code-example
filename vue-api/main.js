class Dep {
  constructor () {
    this.subscribers = new Set()
  }
  // 依赖搜集
  depend () {
    if(activeUpdate) {
      // 注册依赖
      this.subscribers.add(activeUpdate)
    }
  }
  // 执行依赖
  notify () {
    // 通知执行依赖
    this.subscribers.forEach(sub => sub())
  }
}

let activeUpdate
  
function autorun(update) {
  // 响应区
  function wrappendUpdate () {
    activeUpdate = wrappendUpdate
    update()
    activeUpdate = null
  }
  wrappendUpdate()
}



// 重写obj对象的get set, 让对象的赋值与取值可追踪
function observe(obj) {
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        dep.depend()
        return internalValue
      },
      set(newValue) {
        internalValue = newValue
        dep.notify()
      }
    })
  })
}

const dep = new Dep()

const state = {
  count: 0,
}

observe(state)

autorun(() => {
  // 更新函数
  console.log(state.count)
})

state.count = 1