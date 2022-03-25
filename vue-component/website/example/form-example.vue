<template>
  <m-form :model="model" :rules="rules">
    <m-form-item prop="name" label="姓名">
      <input type="text" v-model="model.name" />
    </m-form-item>
    <m-form-item prop="age">
      <template #label>
        11111
      </template>
      <input type="text" v-model="model.age" />
    </m-form-item>
  </m-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

function useForm() {
  const model = reactive({
    name: 'xxx',
    age: 24,
  })
  return {
    model
  }
}

function useRule() {
  const checkAge = (rule: any, value: any, callBack: any) => {
    console.log(rule)
    console.log(value)
    callBack()
  }
  const rules = reactive({
    name: [{required: true, message: 'new name', trigger: 'blur'}],
    age: [
      {validator: checkAge, trigger: 'blur'}
    ]
  })
  return {
    rules
  }
}

export default defineComponent({
  setup() {
    return {
      ...useForm(),
      ...useRule()
    }
  },
})
</script>
