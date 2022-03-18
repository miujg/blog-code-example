import { computed, defineComponent, h, inject, PropType } from "vue";
import { useNamespace } from '@m-ui/hooks'
type ColSizeObj = {
  span?: number, 
  offset?: number
}
type ColSize = Number | ColSizeObj

export default defineComponent({
  name: "MCol",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    span: {
      type: Number,
      default: 24,
    },
    offset: {
      type: Number,
      default: 0,
    },
    xs: {
      type: [Object, Number] as PropType<ColSize>,
      default: 0 
    },
    sm: {
      type: [Object, Number] as PropType<ColSize>,
      default: 0 
    },
    md: {
      type: [Object, Number] as PropType<ColSize>,
      default: 0 
    },
    lg: {
      type: [Object, Number] as PropType<ColSize>,
      default: 0 
    },
    xl: {
      type: [Object, Number] as PropType<ColSize>,
      default: 0 
    }
  },
  setup(props, { slots }) {
    const ns = useNamespace('col')
    const gutter = inject("MRow", 0)
    const classs = computed(() => {
      const ret = [];
      const pos = ["span", "offset"] as const;
      pos.forEach((item) => {
        const size = props[item];
        if (typeof size === "number" && size > 0) {
          // m-col-span-1 m-col-offset-1
          ret.push(ns.b(`${item}-${props[item]}`))
        }
      });
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
      sizes.forEach(item => {
        const size = props[item]
        if (typeof size === 'number') {
          size > 0 && ret.push(ns.b(`${item}-${size}`))
        } else if (typeof size === 'object') {
          Object.keys(size).forEach(key => {
            size[key] > 0 && ret.push(
              key !== 'span'
              ? ns.b(`${item}-${key}-${size[key]}`)
              : ns.b(`${item}-${size[key]}`)
            )
          })
        }
      })
      return [ns.b(), ...ret];
    });

    const styles = computed(() => {
      if (gutter !== 0) {
        return {
          paddingLeft: gutter / 2 + "px",
          paddingRight: gutter / 2 + "px",
        };
      }
      return "";
    });
    return () =>
      h(
        props.tag,
        {
          class: classs.value,
          style: styles.value,
        },
        slots.default?.()
      );
  },
});
