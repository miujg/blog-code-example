
import { Ref, ref, computed, watch, unref, ComputedRef } from 'vue-demi'

type Refable<T> = Ref<T> | T

export function usePromise<T = unknown> (
  promise: Refable<Promise<T> | null | undefined>
) {
  const isRejected = ref(false)
  const isResolved = ref(false)
  const isPending = computed(() => !isRejected.value && !isResolved.value)
  const error = ref<Error | undefined | null>()
  const data = ref<T | null | undefined>()
  watch(
    () => unref(promise),
    (newPromise) => {
      isRejected.value = false
      isResolved.value = false
      error.value = null
      newPromise?.then(newData => {
        data.value = newData
        isResolved.value = true
      }, err => {
        error.value = err
        isRejected.value = true
      })
    },
    {
      immediate: true
    }
  )
  return {
    isRejected, isResolved, isPending, error, data
  }
}

export interface UsePromiseResult<T = unknown> {
  isPending: ComputedRef<boolean>
  isResolved: Ref<boolean>
  isRejected: Ref<boolean>
  error: Ref<Error | undefined | null>
  data: Ref<T | undefined | null>
}