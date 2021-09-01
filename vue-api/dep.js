// 依赖追踪

// Depend： 当前执行的代码，搜集依赖
// notify: 依赖发生改变，依赖重新执行
// 两者之间的关系，观察者模式
//  autorun: 接受一个更新函数，注册依赖项

class Dep {
  constructor () {
    this.subscribers = new Set()
  }
  depend () {
    if(activeUpdate) {
      // 注册依赖
      this.subscribers.add(activeUpdate)
    }
  }
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

const dep = new Dep()

autorun(() => {
  dep.depend()
})

dep.notify()