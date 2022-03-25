<template>
  <form :class="classs">
    <slot />
  </form>
</template>

<script lang="ts">
import { FormRules, LabelPosition } from './form.types'
import { computed, defineComponent, PropType, provide } from 'vue'
import { useNamespace } from '@m-ui/hooks'

export default defineComponent({
  name: 'MForm',
  props: {
    model: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    rules: {
      type: Object as PropType<FormRules>,
      default: () => ({})
    },
    labelPosition: {
      type: String as PropType<LabelPosition>,
      default: 'right'
    }
  },
  setup(props, ctx) {
    provide('MForm', {
      model: props.model || {},
      rules: props.rules || {} 
    })    
    const ns = useNamespace('form')
    const classs = computed(() => {
      return [
        ns.b(),
        ns.m(`label-${props.labelPosition}`)
      ]
    })
    return {
      classs
    }
  }
})
</script>
