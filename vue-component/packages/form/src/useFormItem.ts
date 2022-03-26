import { useNamespace } from '@m-ui/hooks'
import { computed, reactive } from 'vue'
import { IFormItemProps } from './form-item.types'
import { Arrayable, FormItemRule, IMForm, ValidataFunc } from './form.types'
import type { RuleItem } from 'async-validator'
import { emitter } from './useForm'

// class相关
export const useFormItemClasss = () => {
  const ns = useNamespace('form-item')
  const classs = computed(() => {
    return [
      ns.b()
    ]
  })
  const labelClass = computed(() => {
    return [
      ns.e('label')
    ]
  })
  const errClass = computed(() => {
    return [
      ns.e('error')
    ]
  })
  return {
    labelClass,
    classs,
    errClass  
  }
}

// 封装校验函数，转发给form组件
export const useRules = (props:IFormItemProps, mform:IMForm) => {
  const formItemStatus = reactive({
    error: false,
    message: ''
  })
  // 封装各个form-item的校验函数
  const validata = (modelKey: string):boolean => {
    let rules:Arrayable<FormItemRule> = mform.rules[modelKey]
    rules = Array.isArray(rules)? rules : [rules]
    const value = mform.model[modelKey]
    formItemStatus.error = rules.every((rule:RuleItem) => {
      let passed = true
      formItemStatus.message = rule.message as string
      if (rule.required) {
        passed = value.trim() !== ''
      } else if (rule.validator) {
        // 自定义校验
        const callback = (error?: string|Error):void => {
          passed = error === undefined
          formItemStatus.message = error === undefined? '' :
            typeof error === 'string' ? error : error.message
        }
        rule.validator(rule, value, callback, {}, {})
      }
      return passed
    })
    return formItemStatus.error
  }
  // 使用emitter将校验函数发送给form组件
  const itemValidataFun: ValidataFunc = {}
  itemValidataFun[props.prop] = validata
  emitter.emit('validataFunc', itemValidataFun)
  return {
    formItemStatus
  }
}