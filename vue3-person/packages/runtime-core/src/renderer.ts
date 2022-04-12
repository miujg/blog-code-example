import { effect } from '@vue/reactivity'
import { ShapeFlags } from '@vue/shared'
import { createAppAPI } from './apiCreateApp'
import { createComponentInstance, setupComponent } from './component'
import { queueJob } from './scheduler'
import { normalizeVNode, Text } from './vnode'

// 接受不同平台的rendererOptions
// 创建不同的渲染器
export function createRenderer(rendererOptions) {

  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    // createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    nextSibling: hostNextSibling

  } = rendererOptions

  // 创建一个effect， 在effect调用render 
  // render中拿到的数据会搜集这个effect
  // 数据更新 effect重新执行
  const setupRenderEffect = (instance, container) => {
    // 每个组件有一个effect（组件级更新）
    effect(function componentEffect() {
      // 初次渲染
      if(!instance.isMounted) {
        const proxyToUse = instance.proxy
        // 组件vnode 组件的内容 subTree 对应vue的 $vnode _vnode
        const subTree = instance.subTree = instance.render.call(proxyToUse, proxyToUse)
        patch(null, subTree, container)
        instance.isMounted = true
      } else {
        // 更新逻辑
        // diff (diff  序列优化 watchApi 声明周期) 
        // 比较两个虚拟节点
        const proxyToUse = instance.proxy
        const prevTree = instance.subTree
        const nextTree = instance.render.call(proxyToUse, proxyToUse)
        // 核心 比较这两棵树（diff）
        patch(prevTree, nextTree, container)
      }
    }, {
      scheduler: (effect) => queueJob(effect)
    })
  }
  const mountComponent = (initialVNode, container)  => {
    // 核心  调用setup拿到返回值， 使用render，进行渲染
    // 1. 先实例
    // 根据虚拟dom创建组件实例
    const instance = initialVNode.component = createComponentInstance(initialVNode)
    // 2. 需要的数据解析到实例上
    setupComponent(instance)
    // 3. 创建一个effect 让render执行
    setupRenderEffect(instance, container)
  }

  const processComponent = (n1, n2, container) => {
    if (n1 == null) { // 没有上一次节点 初次渲染
      mountComponent(n2, container)
    } else {
      // 组件更新
    }
  }

  // -------^^^^^^^组件………………

  // --------- 元素
  const mountChildren = (children, container) => {
    for (let i = 0; i < children.length; i++) {
      // 如果是文本节点 将其准换为文本节点对应的虚拟节点
      const child = normalizeVNode(children[i])
      patch(null, child, container)
    }
  }
  const mountElement = (vnode, container, anchor=null) => {
    // 递归渲染
    const { props, shapeFlag, type, childred } = vnode
    const el = (vnode.el = hostCreateElement(type))
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key])
      }
    }
    hostInsert(el, container, anchor)
    // children是文本
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      hostSetElementText(el, childred)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 开始递归
      console.log('数组')
      mountChildren(childred, el)
    }
  }
  // 比较两个props
  const pathchProps = (oldProps, newProps, el) => {
    if(oldProps !== newProps) {
      // 新的覆盖老的
      for (let key in newProps) {
        const prev = oldProps[key]
        const next = newProps[key]
        if (prev !== next) {
          hostPatchProp(el, key, prev, next)
        }
      }
      // 新的没有，老的有。要删掉老的
      for (let key in oldProps) {
        if(!(key in newProps)) {
          hostPatchProp(el, key, oldProps[key], null)
        }
      }

    }
  }
  // 比较两个带key的孩子数组 domdiff
  const patchKeyChildren = (c1, c2, el) => {
    // 指针
    let i = 0
    let e1 = c1.length - 1
    let e2 = c2.length - 1

    // 先考虑特殊情况：

    // 从头开始比，遇到不同的就停止(尽可能的减少比对的区域)
    // // sync from start
    while(i <= e1 && i <= e2 ) {
      const n1 = c1[i]
      const n2 = c2[i]
      if(isSameVNodeType(n1, n2)) {
        // 递归比 深度遍历
        patch(n1, n2, el)
      } else {
        break
      }
      i++
    }

    // 次数i不用置为0的原因：
    // abcd    abfmcd  
    // 不置为0，可以提取出fm

    // 从尾部开始比较
    // sync from end
    while(i <= e1 && i <= e2 ) {
      const n1 = c1[e1]
      const n2 = c2[e2]
      if(isSameVNodeType(n1, n2)) {
        // 递归比 深度遍历
        patch(n1, n2, el)
      } else {
        break
      }
      e1--
      e2--
    }

    console.log(i, e1, e2)
    
    // 怎么确定是挂载还是卸载
    // i的值大于e1 说明老的少 挂载
    if (i > e1) { // 有一方比对完毕（特殊情况） // common sequence + mount (同序列挂载)
      // 挂载
      if(i <= e2) {
        // 确定参照物
        const nextPos = e2 + 1
        const anchor =  nextPos < c2.length ? c2[nextPos].el : null
        // 向前插入 还是向后插入
        while(i <= e2) {
          // 通过例子 abc dabc 来理解这里 细品
          patch(null, c2[i], el, anchor)
          i++
        }
      }
    } else if(i > e2) { // 有一方比对完毕（特殊情况） // common sequence + unmount （同序列卸载）
      // 老的多
      // 卸载
      while(i<=e1) {
        unmount(c1[i])
        i++
      }
    } else {
      // 乱序比较 需要尽可能的复用
      // 用新的元素元素做成一个映射表，一样的复用
      // 不一样的要插入
      let s1 = i 
      let s2 = i

      // vue3 使用新的做映射表
      // 新的 key 与 索引 做成映射表
      const keyToNewIndex = new Map()
      for (let i = s2; i <= e2; i++) {
        const childVNode = c2[i]
        keyToNewIndex.set(childVNode.key, i)
      }


      const tobePatched = e2 - s2 + 1
      const newIndexToOldIndexMap = new Array(tobePatched).fill(0)


      // 找到能复用的 老的在新的没有找到就删除
      // 老的找新的 
      debugger
      for (let i = s1; i <= e1; i++) {
        const oldVNode = c1[i]
        const newIndex = keyToNewIndex.get(oldVNode.key)
        if (newIndex === undefined) {
          // 老的在新的没有 需要删除
          unmount(oldVNode)
        } else { // 老的在新的里面，开始比对。比对完之后 位置不对
          // 新旧索引关系 ，新的在老的那里是第几个（从1开始）。
          newIndexToOldIndexMap[newIndex - s2] = i + 1
          // 最后为0表示要插入

          patch(oldVNode, c2[newIndex], el)
        }
      }

      let increasingNewIndexSequence = getSequence(newIndexToOldIndexMap)
      let j = increasingNewIndexSequence.length - 1

      for (let i = tobePatched - 1; i >= 0; i--) {
        let currentIndex = i + s2 // 找到h的索引
        let child = c2[i + s2]
        // 找到参照物
        let anchor = currentIndex + 1 < c2.length ? c2[currentIndex + 1].el : null
        
        if(newIndexToOldIndexMap[i] === 0) { // 为0说明没有被patch过
          patch(null, child, el, anchor)
        } else {
          // 全部移动 不太好

          // 使用递增子序列
          if (i != increasingNewIndexSequence[j]) {
            hostInsert(child.el, el, anchor) // 操作d 以d的下一个为参照物

          } else {
            j-- // 跳过不需要移动的元素
          }
        }
      }

      // 有些没有被patch到。 有些插入顺序不正确
      // 需要移动节点 并且新增节点插入
      // 算法 最长递增子序列
    } 
  }

  // 最长递增子序列
  function getSequence(arr) {
    const len = arr.length 
    // 返回递增的索引
    const result = [0]
    const p = arr.slice(0)
    let start
    let end
    let middle
    for (let i = 0; i < len; i++) {
      const arrI = arr[i]
      // 为0的时候表示要删除,这种情况不需要排
      if (arrI !== 0) {
        // result的最后一项（索引）
        let resultLastIndex = result[result.length - 1]
        // 如果result的最后一项 小于 arr当前项， 直接添加到后面
        if (arr[resultLastIndex] < arrI) {
          // 将索引加入进去 
          // 每次放的时候，让这一项记录前一项
          p[i] = resultLastIndex 
          result.push(i)
          // 跳出循环
          continue
        }
        start = 0,
        end = result.length - 1
        while (start < end) { // 重合说明找到
          middle = ((start + end) / 2) | 0
          if(arr[result[middle]] < arrI) {
            start = middle + 1
          } else {
            end = middle - 1
          }
        }
        if(arrI < arr[result[start]]) {
          if (start > 0) { //替换
            p[i] = result[start - 1]
          }
          result[start] = i
  
        }
      }
    }
    let len1 = result.length - 1
    let last = result[len1 - 1]
    while (len1-- > 0) { // 根据前驱节点 
      result[len1] = last
      last = p[last]
    }
    return result
  }

  // 销毁儿子
  const unmountChildren = (childred) => {
    for (let i = 0; i < childred.length; i++ ) {
      unmount(childred[i])
    }
  }

  // 比较儿子
  const patchChildren = (n1, n2, el) => {
    // 1. 老的有儿子 新的没有
    // 2. 老的没儿子 新的有儿子
    // 3. 新老都有儿子
    // 4. 新老都是文本

    const c1 = n1.childred
    const c2 = n2.childred

    const prevShapeFlag = n1.shapeFlag
    const shapeFlag = n2.shapeFlag

    // 新的是文本
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 老的有孩子 新的却是一个文本。 需要把老的里面的儿子移除
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        unmountChildren(c1) // 如果c1中包含组件会调用组件的销毁方法
      }

      // 都是文本 且不相等
      if (c1 !== c2) {
        hostSetElementText(el, c2)
      }
    } else {
      // 现在是数组(一个元素也是数组) ， 上一次有可能是文本 或者数组

      // 当前是元素/数组 之前是数组
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          // 两个数组的比较 （都是数组 且 都不是文本）
          // dom-diff算法 *****  最核心 ****  
          // 比较两个带key的孩子
          patchKeyChildren(c1, c2, el)

        } else {
          // 当前没有孩子  特殊情况
          unmountChildren(c1)
        }
      } else {
        // 之前是文本 
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          // 之前的文本清空
          hostSetElementText(el, '')
          // 之前文本 这次数组
          if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            // 之前的文本清空了， 当前的数组挂载到el上
            mountChildren(c2, el)
          } else {
            // 当前没有孩子  特殊情况
            unmountChildren(c1)
          }
        } else {
          // 之前没有孩子
        }
      }
    }
  }

  const patchElement = (n1, n2, container, anchor=null) => {
    // 元素是相同节点
    // 原始元素复用
    // 更新属性
    const el = n2.el = n1.el
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    pathchProps(oldProps, newProps, el)
    // 儿子的比较
    patchChildren(n1, n2, el)
  }

  const processElement = (n1, n2, container, anchor=null) => {
    if (n1 == null) {
      mountElement(n2, container, anchor)
    } else {
      patchElement(n1, n2, container, anchor)
    }
  }

  // ------ 文本
  const processText = (n1, n2, container) => {
    if (n1 == null) {
      hostInsert((n2.el = hostCreateText(n2.childred)), container)
    }
  }

  // 判断两个Element是不是同类型
  const isSameVNodeType = (n1, n2) => {
    return n1.type === n2.type && n1.key === n2.key
  }

  // 卸载n1,后续还要扩展
  // 组件 卸载组件 执行声明周期
  const unmount = (n1) => {
    
    hostRemove(n1.el)
  }

  const patch = (n1, n2, container, anchor = null) => {
    // 不同类型，做初始化操作
    const  {shapeFlag, type}  = n2

    if (n1 && !isSameVNodeType(n1, n2)) {
      // 不是同一个Element 那直接替换以前的
      // 卸载n1
      
      // 获取n1的下一个节点， 作为参照节点
      // 插入元素就插在这个参照节点之前 细品一下
      anchor = hostNextSibling(n1)
      unmount(n1)
      n1 = null // 走后面流程 重新走后面流程
    } else {

    }

    switch (type) {
      // 文本节点
      case Text:
        processText(n1, n2, container)
        break
      default:  
        if (shapeFlag & ShapeFlags.ELEMENT) {
          console.log('元素')
          processElement(n1, n2, container, anchor)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          console.log('组件')
          processComponent(n1, n2, container)
        }
    }
  }

  const render = (vnode, container) => {
    // core根据不同的虚拟节点，创建不同的真实元素
    // 初次渲染的时候
    patch(null, vnode, container)
  }

  return {
    createApp: createAppAPI(render)
  }
}

// 组件 ==》 虚拟dom ==》 真实dom ==》 挂载

