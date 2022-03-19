<template>
  {{checkVal}}
  <m-checkbox-group v-model="checkVal">
    <m-checkbox v-for="c in checks" :key="c" :label="c" @change="checkboxChange">
    </m-checkbox>
  </m-checkbox-group>
  <!-- emit('update:modelValue',[]) -->
  <!-- <m-checkbox v-model="checkVal" @change="checkboxChange">checkbox</m-checkbox> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

function useCheckbox () {
  const checks = ref(['重庆','湖南','湖北'])
  const checkVal = ref(['重庆'])
  const checkboxChange = (val) => {
    console.log(val)
  }
  return {
    checkVal,
    checkboxChange,
    checks
  }
}

export default defineComponent({
  setup() {
    return {
      ...useCheckbox()
    }
  },
})
</script>
