<template>
  <div class="m-transfer">
    <m-transfer-panel :data="sourceData" :props="props" @checked-change="onSourceCheckedChange"></m-transfer-panel>
    <div class="m-transfer__buttons">
      <m-button @click="addToLeft" :disabled="rightChecked.length === 0">{{'<--'}}</m-button>
      &nbsp;
      <m-button @click="addToRight" :disabled="leftChecked.length === 0">{{'-->'}}</m-button>
    </div>
    <m-transfer-panel :data="targetData" :props="props" @checked-change="onTargetCheckedChange"></m-transfer-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import MTransferPanel from './transfer-panel.vue'
import MButton from '@m-ui/button'
import { DataItem, Key, Props } from './transfer.type'
import { useComputedData } from './useTransfer'

export default defineComponent({
  name: 'mTransfer',
  components: {
    MTransferPanel, MButton
  },
  props: {
    data: {
      type: Array as PropType<Array<DataItem>>
    },
    // 右边的
    modelValue: {
      type: Array as PropType<Array<Key>>
    },
    props: {
      type: Object as PropType<Props>,
      default: () => ({
        lable: 'label',
        key: 'key',
        disabled: 'disabled'
      })
    }
  },
  // 32 分钟 todo。。。。
  setup(props, {emit}) {

    const checkedState = reactive({
      leftChecked: [],
      rightChecked: []
    })
    const onSourceCheckedChange = (leftValue) => {
      checkedState.leftChecked = leftValue
    }
    const onTargetCheckedChange = (rightValue) => {
      checkedState.rightChecked = rightValue
    }
    // 移动
    // 右到左。直接删掉右边的，emit出去，会重新计算
    const addToLeft = () => {
      const currentValue = props.modelValue.slice(0) // 拷贝当前右边的索引
      checkedState.rightChecked.forEach(item => {
        const index = currentValue.indexOf(item)
        if (index > -1) {
          currentValue.splice(index, 1)
        }
      })
      emit('update:modelValue', currentValue)
    }
    // 左边到右边。 添加到左边，会重新计算
    const addToRight = () => {
      const currentValue = props.modelValue.slice(0) // 拷贝当前右边的索引
      checkedState.leftChecked.forEach(item => {
        currentValue.push(item)
      })
      emit('update:modelValue', currentValue)
    }

    return {
      ... toRefs(checkedState),
      // 1. 将数据分成两派，左边和右边。 将数据传给相应的组件
      ...useComputedData(props),
      onSourceCheckedChange,
      onTargetCheckedChange,
      addToLeft,
      addToRight
    }
  },
})
</script>
