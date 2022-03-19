import { computed, getCurrentInstance, inject, WritableComputedRef } from 'vue'
import { ICheckboProps, ICheckboxGroupProvide } from './checkbox-types'

const useCheckBoxGroup = () => {
  const checkboxGroup = inject<ICheckboxGroupProvide>('MCheckboxGroup', {})
  const isGroup = checkboxGroup.name === 'MCheckboxGroup' // 判断有没有checkboxgroup
  return {
    isGroup,
    checkboxGroup
  }

}

const useModel = (props: ICheckboProps) => {
  const {emit} = getCurrentInstance()
  const {isGroup, checkboxGroup} = useCheckBoxGroup()
  const model = computed({
    // 拿到组件实例
    get() {
      return isGroup? checkboxGroup?.modelValue?.value || props.modelValue : props.modelValue
    },
    set(val) {
      if (isGroup) {
        return checkboxGroup.changeEvent(val)
      } 
      emit('update:modelValue', val)
    }
  })
  return model
}

const useCheckboxState = (props:ICheckboProps, model:WritableComputedRef<unknown>) => {
  const isChecked = computed (() => {
    const value = model.value
    if (Array.isArray(value)) {
      return value.includes(props.label)
    }
    return value
  })
  return isChecked
}

const useEvent = () => {
  const {emit} = getCurrentInstance()
  const handleChange = (e:InputEvent) => {
    const target = e.target as HTMLInputElement
    const changeVal = target.checked ? true : false
    emit('change', changeVal)
  }
  return handleChange
}

export const useCheckbox = (props:ICheckboProps ) => {
  // 1.设计一个属性 这个属性就是采用的modelValue， 还能更改。更改的时候触发时间，更新数据
  const model = useModel(props)
  // 2. 给checkbox设置一个checked状态
  const isChecked = useCheckboxState(props, model)
  // 3. 创建一个change事件
  const handleChange = useEvent()
  // 3. 每次状态发生变换 调用changeEvent
  return {
    model,
    isChecked,
    handleChange
  }
}