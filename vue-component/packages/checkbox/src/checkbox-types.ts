import { ComputedRef } from "vue"

export interface ICheckboProps {
  indeterminate?: boolean, // 是否单选
  checked?: boolean, // 是否选中 
  name?: string, // 原生name
  disabled?: boolean, // 是否警用
  label?: string | number | object, // group才用得到
  modelValue?: string | number | boolean // 绑定checkbox的值
}

export interface ICheckboxGroupProvide {
  name?: string,
  modelValue?: ComputedRef,
  changeEvent?: (val:unknown) => void
}