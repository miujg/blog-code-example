import createRouteMap from './create-route-map'
import { createRoute } from './history/base'


export default function createMatcher (routes) {

  // {/: Home, /about: About, '/about/b': B}
  let { pathMap } = createRouteMap(routes ) // 根据用户配置创建映射表
  console.log(pathMap)

  function addRoutes () { // 动态添加路由权限
    createRouteMap(routes, pathMap)
  }
  function match (path) { // 给我个路径，匹配路由
    let record = pathMap[path]
    return createRoute(record, {path})
  }
  return {
    addRoutes,
    match
  }
} 