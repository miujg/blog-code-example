<template>
  <div :class="classs">
    <span class="z-checkbox__input">
      <input type="checkbox" 
        :checked="isChecked"
        v-model="model"
        @change="handleChange"
        :name="name"
        :disabled="disabled"
        :indeterminate="indeterminate"
        :value="label"
      >
      <!-- vue的特点， 对于checkbox，如果绑定的是一个数组， value在数组里面 则被选中 -->
    </span>
    <span class="z-checkbox__label">
      <slot>{{label}}</slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useNamespace } from '@m-ui/hooks'
import { useCheckbox } from './useCheckbox'

export default defineComponent({
  name: 'MCheckbox',
  props: {
    name: String,
    indeterminate: Boolean,
    checked: Boolean,
    disabled: Boolean,
    label: [String, Number, Object],
    modelValue: [String, Number, Boolean]
  },
  // 防止绑定到根元素， 通过ctx.emit能拿到,还有类型提示
  // 在组件@click，没有在emits声明，那就绑定到组件的根组件上
  emits: ['update:modelValue','change'],
  setup(props, {emit}) {
    const ns = useNamespace('checkbox')
    
    const classs = computed(() => {
      return [
        ns.b()
      ]
    })

    return {
      classs,
      ...useCheckbox(props)
    }
  },
})
</script>
