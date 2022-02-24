// vue2 与 vue3原理不一样
import { isFunction } from "@vue/shared"
import { effect, track, trigger } from "./effect"
import { TrackOptypes, TriggerOrTypes } from "./operators"

class ComputedRef {
  public _dirty = true // true表示被污染了，要重新执行
  public _value
  public effect
  constructor(public getter, public setter) {
    this.effect = effect(getter, {
      lazy: false,
      scheduler: () => {
        if (!this._dirty) {
          this._dirty = true
          // 通知所有使用到当前computed的effect，执行
          trigger(this, TriggerOrTypes.SET, 'value')
        }
      }
    })
  }

  get value () { // 计算属性也要搜集依赖（vue2不具备）
    if (this._dirty) {
      this._value = this.effect() // 将用户返回值返回
      this._dirty = false
    } 
    // 当前computed 使用到当前computed的effect相关联
    track(this, TrackOptypes.GET, 'value')
    return this._value
  }

  set value (newValue) {
    this.setter(newValue)
  }
}

export function computed(getterOrOptions) {
  let getter
  let setter
  if(isFunction (getterOrOptions)) {
    getter = getterOrOptions
    setter = () => {}
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  return new ComputedRef(getter, setter)
}
