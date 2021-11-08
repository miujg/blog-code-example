<template>
  <h1>{{a}}</h1>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  setup() {
    const a = ref('111')
    return {
      a
    }
  },
}
</script>

<style lang="scss">
h1 {
  color: red;
  transform: translateX(100px);
}
</style>