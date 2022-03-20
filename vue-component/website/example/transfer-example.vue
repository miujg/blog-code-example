<template>
  <m-transfer v-model="rightValue" :data="transferData" :props="transferProp"></m-transfer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
interface Option {
  key: number
  label: string
  disabled: boolean
}

function useTransfer() {
  const generateData = () => {
    const data: Option[] = []
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `Option ${i}`,
        disabled: i % 4 === 0,
      })
    }
    return data
  }
  return {
    transferData: ref<Option[]>(generateData()),
    rightValue: ref([1,4]),
    transferProp: {
      key: 'key',
      label: 'label',
      disabled: 'disabled'
    }
  }
}

export default defineComponent({
  setup() {
    return {
      ...useTransfer()
    }
  },
})
</script>