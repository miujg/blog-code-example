// class Dep {
//   constructor () {
//     this.subscribers = new Set()
//   }
//   // 依赖搜集
//   depend () {
//     if(activeUpdate) {
//       // 注册依赖
//       this.subscribers.add(activeUpdate)
//     }
//   }
//   // 执行依赖
//   notify () {
//     // 通知执行依赖
//     this.subscribers.forEach(sub => sub())
//   }
// }

// let activeUpdate
  
// function autorun(update) {
//   // 响应区
//   function wrappendUpdate () {
//     activeUpdate = wrappendUpdate
//     update()
//     activeUpdate = null
//   }
//   wrappendUpdate()
// }



// // 重写obj对象的get set, 让对象的赋值与取值可追踪
// function observe(obj) {
//   Object.keys(obj).forEach(key => {
//     let internalValue = obj[key]
//     Object.defineProperty(obj, key, {
//       get() {
//         dep.depend()
//         return internalValue
//       },
//       set(newValue) {
//         internalValue = newValue
//         dep.notify()
//       }
//     })
//   })
// }

// const dep = new Dep()

// const state = {
//   count: 0,
// }

// observe(state)

// autorun(() => {
//   // 更新函数
//   console.log(state.count)
// })

// state.count = 1

const state = {
  a: 1,
  b: 10
}

// 重写state的属性的get set
function convert (obj) {
  Object.keys(obj).forEach(key => {
    let initValue = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        // console.log(`get: ${key}, ${initValue}`)
        // 订阅
        dep.depend()
        return initValue
      },
      set(val) {
        // console.log(`set: ${key}, ${initValue}, ${val}`)
        if(initValue === val) return
        initValue = val
        dep.notify()
      }
    })
  })
}

convert(state)
// 搜集依赖 订阅发布
// 订阅更新函数
// 当a变量值变化的时候，发布订阅
class Dep {
  constructor() {
    this._arr = new Set()
  }
  // 依赖搜集 订阅 on
  depend() {
    if(activeUpdate)
      this._arr.add(activeUpdate)
    // if(this._arr.size === 2)
    //   console.log('不可能为2')
  }
  // 通知 发布 emit
  notify() {
    this._arr.forEach(fn => fn())
  }
}

// 不太好理解得点：autorun函数，形成响应区 （慢慢品）

// js单线程 全局变量 用于标注哪个update函数正在被执行
let activeUpdate 
// autorun 创建响应区 代码放入响应区就可以通过dep.depend方法注册依赖项
function autorun(update) {
  function wrapperUpdate() {
    activeUpdate = wrapperUpdate
    update()
    activeUpdate = null
  }
  wrapperUpdate()
} 

const dep = new Dep()
// 怎么形成响应式区域
// 只要对state进行了取值都会将activeUpdate添加到队列
autorun(() => {
  state.b = state.a * 10
})

state.a = 2

console.log(state.b)


let data1 = {name: 'xxx'}
Object.keys(data1).forEach(key => {
  Object.defineProperty(data1, key, {
    get() {},
    set() {}
  })
})
console.log(data1)






