<template>
  <div>
    <slot name="pending"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['name'],
  setup(props, {slots}) {
    return {}
  },
})
</script>
