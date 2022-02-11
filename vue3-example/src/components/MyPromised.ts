// rejected default pending

import { 
  defineComponent,
  PropType,
  toRefs,
  reactive
} from 'vue-demi'

import { usePromise, UsePromiseResult } from './usePromise'

export const MyPromised = defineComponent({
  name: 'MyPromised',
  props: {
    promise: {} as PropType<Promise<unknown> | null | undefined>,
  },
  setup(props, {slots}) {
    // 将props变成ref对象
    const propsAsRefs = toRefs(props)
    const promiseState = reactive<UsePromiseResult>(
      usePromise(propsAsRefs.promise)
    )
    return () => {
      const [slotName, slotData] = promiseState.isRejected
      ? ['rejected', promiseState.error]
      : !promiseState.isPending 
      ? ['default', promiseState.data]
      : ['pending', promiseState.data]
      return slots[slotName]!(slotData)
    }
  },
})