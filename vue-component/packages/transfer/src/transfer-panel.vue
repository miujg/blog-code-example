<template>
  <div class="m-transfer__panel">
    列表
    <m-checkbox v-model="allChecked" 
      @change="handleCheckAllChange"
      :indeterminate="indeterminate"
    >
      全选
    </m-checkbox>
    <div>
      <m-checkbox-group v-model="checked">
        <m-checkbox v-for="item in data" :key="item[keyProp]" :label="item[keyProp]" :disabled="item[disabledProp]">
          {{item[labelProp]}}
        </m-checkbox>
      </m-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { Props } from './transfer.type'
import MCheckbox from '@m-ui/checkbox'
import MCheckboxGroup from '@m-ui/checkbox-group'
import { useCheck } from './useTransfer'

export default defineComponent({
  name: 'MTransferPanel',
  components: { MCheckbox, MCheckboxGroup },
  props: {
    data: {
      type: Array, 
      default: () => []
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
  emits: ['checked-change'],
  setup(props) {
    // 有一个自己的状态
    const panelState = reactive({
      checked: [], // 选中的
      allChecked: false,
      // 是否处于半选状态
      indeterminate: false
    })

    // 根据props 算出key。 动态的
    return {
      ...toRefs(panelState),
      ...useCheck(props, panelState)
    }
  },
})
</script>
