
import { hasChanged, isArray, isObject } from "@vue/shared"
import { reactive } from "."
import { track, trigger } from "./effect"
import { TrackOptypes, TriggerOrTypes } from "./operators"

// value一般是一个普通类型 
// new Proxy() 第一个参数为Object
// 也可以是一个对象，如果是一个对象 只能通过 .value去访问与更改
export function ref(value) {
  // 将普通类型变成一个对象
  return createRef(value)
}

export function shallowRef(value) {
  // 将普通类型变成一个对象
  return createRef(value, true)
}

function createRef(rawValue, shallow = false) {
  return new RefImpl(rawValue, shallow)
}

const convert = val => isObject(val)? reactive(val) : val

class RefImpl {
  public _value
  public __v_isRef = true // 表示是一个ref属性
  constructor(public rawValue, public shallow) {
    // 如果是深度， 需要把里面的都变成响应式
    this._value = shallow? rawValue : convert(rawValue)
  }

  // 属性访问器

  // 去的value 返回_value --》 代理_value
  get value() {
    // track
    track(this, TrackOptypes.GET, 'value')
    return this._value
  }
  set value(newValue) {
    if(hasChanged(this.rawValue, newValue)) {

      // 有变化 缓存新值
      this.rawValue = newValue
      this._value = this.shallow? newValue : convert(newValue)
      trigger(this, TriggerOrTypes.SET, 'value', newValue)
    }
  }
}

// let state = {name: 'jgmiu'} ==> toRef(state, 'name')
// state => {name: RefImpl {}}

// 可以将一个对象的属性 变为ref
export function toRef(target, key) {
  return new ObjectRefImpl(target, key)
}

// object 对象或者数组
// 响应式解构，解构后还是响应式，只是调用的时候要加.value
export function toRefs(object) {
  const result = isArray(object) ? new Array(object.length) : {}
  for (let key in object) {
    result[key] = toRef(object, key)
  } 
}

class ObjectRefImpl {
  public __v_isRef = true // 表示是一个ref属性
  constructor(public target, public key) {

  }

  get value() {
    return this.target[this.key]
  }

  set value(newValue) {
    this.target[this.key] = newValue
  }
}