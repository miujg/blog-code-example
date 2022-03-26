<template>
  <m-form :model="model" :rules="rules" ref="ruleFormRef">
    <m-form-item prop="name" label="姓名">
      <input type="text" v-model="model.name" />
    </m-form-item>
    <m-form-item prop="age">
      <template #label>
        11111
      </template>
      <input type="text" v-model="model.age" />
    </m-form-item>
    <div @click="submit(ruleFormRef)">submit</div>
  </m-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

function useForm() {
  const model = reactive({
    name: 'xxx',
    age: 24,
  })
  const ruleFormRef = ref()
  const submit = (ruleFormRef) => {
    ruleFormRef.validate()
  }
  return {
    model,
    ruleFormRef,
    submit
  }
}

function useRule() {
  const checkAge = (rule: any, value: any, callBack: any) => {
    console.log(rule)
    console.log(value)
    callBack(new Error('xxxx'))
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
