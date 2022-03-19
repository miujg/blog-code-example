<template>
  <div class="m-transfer">
    <m-transfer-panel></m-transfer-panel>
    <div class="m-transfer__buttons">
      <m-button>左</m-button>
      &nbsp;
      <m-button>右</m-button>
    </div>
    <m-transfer-panel></m-transfer-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MTransferPanel from './transfer-panel.vue'
import MButton from '@m-ui/button'
import { DataItem, Key, Props } from './transfer.type'

export default defineComponent({
  name: 'mTransfer',
  components: {
    MTransferPanel, MButton
  },
  props: {
    data: {
      type: Array as PropType<Array<DataItem>>
    },
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
  setup(props) {

  },
})
</script>
