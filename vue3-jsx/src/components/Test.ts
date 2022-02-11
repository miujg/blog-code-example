import {defineComponent} from "vue";

export const Test = defineComponent({
    setup(props, {slots}) {
      console.log('xxx',slots)
      return () => slots['default']!({name: 'xxx'})
    }
})
export default Test