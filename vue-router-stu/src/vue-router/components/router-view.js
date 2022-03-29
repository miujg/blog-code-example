export default {
  // class 组件 Vue.extend 、
  // 效率快 没有实例
  functional: true,
  name: 'router-view',
  render(h, {parent, data}) {
    // 28 12:00
    // route变化重新渲染
    let parentName = parent.$options.name
    let route = parent.$route
    let records = route.matched
    let deepth = 0
    data.routerView = true
    while (parent) {
      let parentName = parent.$options.name
      if (parent.$vnode && parent.$vnode.data.routerView) {
        console.log(parent)
        deepth++
      }
      parent = parent.$parent
    }
    // return h(records[0].component)
    if (records[deepth]) return h(records[deepth].component, data)
  }
}