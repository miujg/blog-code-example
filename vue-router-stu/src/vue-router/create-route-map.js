// 创建 、 添加 pathMap
export default function createRouteMap(routes, oldPathMap) {
  let pathMap = oldPathMap || {}

  // routes

  routes.forEach(route => {
    addRouteRecord(route, pathMap, null)
  })

  return {
    pathMap
  }
}

function addRouteRecord(route, pathMap, parent) {
  const path = parent ? parent.path + '/' + route.path : route.path
  const record = {
    path,
    component: route.component,
    parent,
    name: route.name,
  }
  if (!pathMap[path]) {
    pathMap[path] = record
  }
  if (route.children) {
    route.children.forEach(childRoute => {
      addRouteRecord(childRoute, pathMap, record)
    })
  }
}