import { computed, defineComponent, h, provide } from "vue";

export default defineComponent({
    name: 'MRow',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        gutter: {
            type: Number,
            default: 0
        },
        justify: {
            type: String,
            default: 'start' // flex-start flex-end space-around
        }
    },
    setup(props, {slots}) {

        // 提供给所有的子组件，都能使用这个属性
        provide('MRow', props.gutter)

        const classs = computed(() => {
            return [
                'm-row'
            ]
        })
        // ？.ts的链判断运算符
        return () => h(props.tag, {
            class: classs.value
        }, slots.default?.())
    }
})