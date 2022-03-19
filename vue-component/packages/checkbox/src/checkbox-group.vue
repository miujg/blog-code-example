<template>
  <div class="m-checkbox-group">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from 'vue'

export default defineComponent({
  name: 'MCheckboxGroup',
  props: {
    modelValue: Array
  },
  emits: ['change', 'update:modelValue'],
  setup(props, {emit}) {
    // 将props computed 包一层给儿子
    const modelValue = computed(() => props.modelValue)
    const changeEvent = (val) => {
      emit('change', val)
      emit('update:modelValue', val)
    }
    provide('MCheckboxGroup', {
      name: 'MCheckboxGroup',
      modelValue,
      changeEvent
    })
  },
})
</script>
