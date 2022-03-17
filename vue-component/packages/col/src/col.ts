import { computed, defineComponent, h, inject } from "vue";

export default defineComponent({
    name: 'MCol',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        span: {
            type: Number,
            default: 24
        },
        offset: {
            type: Number,
            default: 0
        }
    },
    setup(props, {slots}) {
        const gutter = inject('MRow', 0)
        const classs = computed(() => {
            const ret = []
            const pos = ['span', 'offset'] as const
            pos.forEach(item => {
                const size = props[item]
                if (typeof size === 'number' && size > 0) {
                    // m-col-span-1 m-col-offset-1
                    ret.push(`m-col-${item}-${props[item]}`)
                }
            })
            return [
                'm-col',
                ...ret
            ]
        })
        const styles = computed(() => {
            if (gutter !== 0) {
                return {
                    paddingLeft: gutter/2 + 'px',
                    paddingRight: gutter/2 + 'px'
                }
            }
            return ''
        })
        return () => h(props.tag, {
            class: classs.value,
            style: styles.value
        }, slots.default?.())
    }
})