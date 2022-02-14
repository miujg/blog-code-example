### vue2 与 vue3 源码区别

#### 使用层面
1. modrepo，将模块拆分package。（方便管理，结构清晰，知识代码体积大）
2. 采用ts进行类型校验， vue2采用flow
3. vue3性能优化， 支持tree-shaking, 不适用就不打包
4. vue REFc

#### 代码层面
1. vue3劫持数据采用proxy, vue2劫持数据采用defineProperty, defineProperty有一定缺陷。proxy是一个天然的拦截器，性能好，不需要改写属性的get、set，一上来就不用全部递归。取到一层才去拦截。
2. （dom-diff）模块编译进行了优化，编译的时候生成Block tree, 可以对子节点的动态节点进行收集，可以减少比较，采用patchFlag标记动态节点。
3. compositionApi, 拒绝反复横跳，一个功能拆分到不同方法，方法放到实例，不好推导类型。 （对比mixin的好处： mixin数据来源不清晰，命名冲突）
4. 增加了 Fragment(父节点), Teleport(传送门), Suspense(异步组件)
5. ref(普通值变成响应式，底层采用defineProperty )， reactive(让一个对象变成响应式)

### vue3比较核心的模块
reactivity（响应式）， runtime-core(与平台无关的运行时)， runtime-dom（针对浏览器的运行时）， compiler-core(编译的核心),compiler-sfc/ssr/dom(针对某个特定方面的编译,shared(多个包共享), vue(完整版本，包括运行时和编译器) 


## 搭建modrepo项目
必须使用yarn，目前只有yarn才支持。

```
{
  "name": "@vue/shared",
  "version": "1.0.0",
  "main": "index.js",
  "module": "dist/shared.esm-bundler.js",
  "license": "MIT",
  "buildOptions": {
    "name": "VueShared",
    "formats": ["cjs", "esm-bundler"]
  }
}
```
> main是给commonjs使用， module：webpack、工程化的使用等