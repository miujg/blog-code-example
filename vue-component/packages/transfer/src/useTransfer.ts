import { computed, getCurrentInstance, watch } from 'vue'
import { ITransferProps, ITransferPanelProps, IPanelState } from './transfer.type'

export const useComputedData = (props:ITransferProps) => {
  const propsKey = computed(() => props.props.key)
  const data = computed(() => {
    return props.data.reduce((memo, current) => {
      memo[current[propsKey.value]] = current
      return memo 
    }, {})
  })
  // 左边
  const sourceData = computed(() => {
    return props.data.filter(item => !props.modelValue.includes(item[propsKey.value]))
  })
  // const targetData = computed(() => {
  //   return props.modelValue.reduce((memo, key) => {
  //     memo.push(data.value[key])
  //     return memo
  //   }, [])
  // })
  const targetData = computed(() => {
    return props.data.filter(item => props.modelValue.includes(item[propsKey.value]))
  })
  return {
    propsKey,
    sourceData, 
    targetData
  }
}

export const useCheck = (props:ITransferPanelProps, panelState:IPanelState) => {
  const { emit } = getCurrentInstance()
  const labelProp = computed(() => props.props.label)
  const keyProp = computed(() => props.props.key)
  const disabledProp = computed(() => props.props.disabled)
  const checkableData = computed(() => props.data.filter(item => !item[disabledProp.value]))


  const  handleCheckAllChange = (val) => {
    panelState.allChecked = val
    panelState.checked = val? checkableData.value.map(item => item[keyProp.value]) : []
  }

  // watch第一个参数尽量放函数（性能），对象会去遍历对象
  watch(() => panelState.checked, () => {
    // 儿子里 有false 表示半选
    // 儿子里全是false 不全选
    // 全是true 全选
    emit('checked-change', panelState.checked)
  }) // watch是基于effect实现，知识有对应的自己的调度方法scheduler

  return {
    labelProp,
    keyProp,
    disabledProp,
    handleCheckAllChange
  }
}