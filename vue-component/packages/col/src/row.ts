import { computed, defineComponent, h, PropType, provide } from "vue";
import { useNamespace } from '@m-ui/hooks'
type IRowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'
const rowJustifies:Array<IRowJustify> = ['start', 'end', 'center', 'space-around', 'space-between']
export default defineComponent({
  name: "MRow",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    // 分栏间隔
    gutter: {
      type: Number,
      default: 0,
    },
    justify: {
      type: String as PropType<IRowJustify>,
      default: "start",
    },
  },
  setup(props, { slots }) {
    // 提供给所有的子组件，都能使用这个属性
    provide("MRow", props.gutter);
    const ns = useNamespace('row')
    const classs = computed(() => {
      return [
        ns.b(),
        rowJustifies.includes(props.justify) && `${ns.when('justify')}-${props.justify}`
      ];
    });
    const styles = computed(() => {
      if (typeof props.gutter === 'number' && props.gutter > 0 ) {
        const distance = 0 - (props.gutter / 2) + 'px'
        return {
          marginLeft: distance,
          marginRight: distance
        }
      }
      return {}
    })
    return () =>
      h(
        props.tag,
        {
          class: classs.value,
          style: styles.value
        },
        slots.default?.() // ？.ts的链判断运算符
      );
  },
});
