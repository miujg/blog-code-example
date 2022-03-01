// 核心： 提供操作domAPI的方法
// 操作节点、操作水泥杆的更新

import { extend } from "@vue/shared";
import { patchProp } from "./patchProp";
import { nodeOps } from './nodeOps'
import { createRenderer } from "@vue/runtime-core";

// 节点：增删改查
// 属性操作 添加 删除 更新（样式 类 事件 其他）

// 渲染时用到的所有方法 传给runtime-core
const rendererOptions = extend({patchProp}, nodeOps)


// ---- dom层与核心区别 细品 -------



// 用户调用 runtime-dom ， runtime-dom调用runtime-core
// runtime-dom 只针对浏览器操作



// vue runtime-core提供核心方法 处理渲染，他依赖于runtime-dom的api进行渲染
export function createApp (rootComponent, rootProps) {
  const app = createRenderer(rendererOptions).createApp(rootComponent, rootProps)
  const { mount } = app
  app.mount = function (selector:string) {
    // 清空容器内容
    const container = document.querySelector(selector) as HTMLElement
    container.innerHTML = ''

    // 将组件渲染成为dom元素 然后挂载。 --- runtime-core的问题
    //重写 函数劫持
    mount(container)
  }
  return app
}

export * from '@vue/runtime-core'

