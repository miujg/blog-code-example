<template>
  <button :class="classs" @click="hanleClick">
    <i v-if="loading" class="m-icon-jiazai"></i>
    <i v-else :class="icon"></i>
    <span v-if="$slots.default"><slot /> </span> 
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
type IButtonType = 'primary' | 'warning' | 'danger' | 'default' | 'success'
// loading icon冲突
// 只有loading 没内容 要吧插槽去掉 v-if="$slot.default"
export default defineComponent({
  name: 'MButton',
  props: {
    type: {
      // string 与 String的区别
      type: String as PropType<IButtonType>,
      default: 'default',
      vaildator: (val:string) => {
        return [
          'primary', 'warning', 'danger', 'default', 'success'
        ].includes(val)
      }
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    loading: Boolean,
    // 是否圆角
    round: Boolean
  },
  emits: ['click'],
  setup(props, ctx) {
    const classs = computed(() => ([
      'm-button',
      `m-button--${props.type}`,
      {
        'is-disabled': props.disabled,
        'is-loading': props.loading,
        // 是否是
        'is-round': props.round
      }
    ]))
    const hanleClick = (e:MouseEvent) => {
      ctx.emit('click', e)
    }
    return {
      classs,
      hanleClick
    }
  }
})
</script>
