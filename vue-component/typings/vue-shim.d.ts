// 定义所有.vue的类型
// 一个.vue文件就是一个组件，这个组件上有一个install方法
declare module '*.vue' {
    import { App, defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent> & {install(app: App):void}
    

    export default component
}
