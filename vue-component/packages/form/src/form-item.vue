<template>
  <div :class="classs">
    <label :class="labelClass" v-if="!$slots.label">{{label}}</label>
    <label :class="labelClass" v-else>
      <slot name="label" />
    </label>
    <slot />
    <div :class="errClass" v-if="!$slots.error">error</div>
    <div v-else :class="errClass">
      <slot name="error" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { useNamespace } from '@m-ui/hooks'
import { useFormItemClasss, useRules } from './useFormItem.ts'
import { IMForm } from './form.types'

export default defineComponent({
  name: 'MFormItem',
  props: {
    prop: String,
    label: String,
    require: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const mform:IMForm = inject('MForm', {})
    return {
      ...useFormItemClasss(),
      ...useRules(props,mform.model)
    }
  }
})
</script>
