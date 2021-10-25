// 类型保护 具体到某个类型 类型判断 缩小范围
// js: typeof instanceof in

// 1) typeof
function getVal(val: string | number) {
  if(typeof val === 'string') {
    // val 为string 点出string的方法
  } else {
    // val 为number 点出number的方法
  }
}

// 2) instance
class Dog{}
class Cat{}

let getInstance = (clazz:new () => Dog | Cat) => {
  return new clazz()
}

let instance = getInstance(Dog)
if(instance instanceof Dog) {
  // 一定是狗
} else {
  // 一定是猫
}

// 3) in操作符

// interface Fish {
//   swiming:string
// }
// interface Bird {
//   fly:string
// }

// function getType(animal: Fish | Bird) {
//   if('swiming' in animal) {
//     animal
//   } else {
//     animal
//   }
// }

// -------------------------ts特有的 可辨识类型

interface IButton1 {
  type: 'warning'
}

interface IButton2 {
  type: 'success'
}

function getButton(val: IButton1 | IButton2) {
  if(val.type === 'warning') {

  } else {

  }
}

// is语法 自定义类型的判断
interface Fish {
  swiming:string
}
interface Bird {
  fly:string
}

// animal is Fish: animal是不是鱼
function isFish(animal: Fish | Bird): animal is Fish {
  return 'swiming' in animal
}

function getType(animal: Fish | Bird) {
  if(isFish(animal)) {
    animal
  } else {
    animal
  }
}

// null保护 | 非空断言

function getNum(val?: number|null) {
  val = val || 10
  function a() {
    // 内部函数 无法推导val的值 此时的val=》 number|null|undefined
  }
}

// 代码完整性保护 反推代码 never

// 圆形
interface ICircle {
  kind:'circle'
  r:number
}

// 长方形
interface IRant {
  kind:'rant'
  width:number
  height:number
}

const assert = (obj:never) => {}
const getArea = (obj:ICircle | IRant) => {
  switch (obj.kind) {
    case 'circle':
      break
    case 'rant':
      break
    // 永远到不了 代码完整性保护
    default:
      assert(obj)
  }
}

getArea({kind: 'rant', width: 100, height: 50})






export {

}