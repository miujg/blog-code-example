
// desc: [
//   { required: true, message: 'Please input activity form', trigger: 'blur' },
// ],

// pass: [{ validator: validatePass, trigger: 'blur' }],

// type Validator = 
import type { RuleItem } from 'async-validator'

export interface FormItemRule extends RuleItem {
  trigger?: string
}
export type Arrayable<T> = T | T[]
export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>

export type LabelPosition = 'left' | 'right' | 'top' 

export interface IFormProps {
  model?: Record<string, any>,
  rules?: FormRules,
  labelPosition?: LabelPosition,
  labelWidth: string | number
}

export interface IMForm {
  model: Record<string, any>,
  rules: FormRules
}

// mitt 监听相关

export type ValidataFunc = {
  [key: string]: (text: string) => boolean
}

export type Events = {
  validataFunc: ValidataFunc,
}