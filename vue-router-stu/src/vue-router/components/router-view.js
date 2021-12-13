export default {
  // class 组件 Vue.extend 、
  // 效率快 没有实例
  functional: true,
  name: 'router-view',
  render(h, {data, parent}) {
    // 28 12:00
    let route = parent.$route
    let records = route.matched
    let deepth = 0
    console.log(parent.$vnode)
    console.log(records[0])
    return h(records[0].component)
  }
}