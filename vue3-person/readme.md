### vue2 与 vue3 源码区别

#### 使用层面
1. modrepo，将模块拆分package。（方便管理，结构清晰，可能仓库代码体积大）
2. 采用ts进行类型校验， vue2采用flow
3. vue3性能优化， 支持tree-shaking, 不适用就不打包
4. vue REFc

#### 代码层面
1. vue3劫持数据采用proxy, vue2劫持数据采用defineProperty, defineProperty有一定缺陷。proxy是一个天然的拦截器，性能好，不需要改写属性的get、set，就不需要一上来就递归对象属性。取到一层才去拦截。
2. （dom-diff）模块编译进行了优化，编译的时候生成Block tree, 可以对子节点的动态节点进行收集，可以减少比较，采用patchFlag标记动态节点。
3. compositionApi, 拒绝反复横跳，一个功能拆分到不同方法，方法放到实例，不好推导类型。 （对比mixin的好处： mixin数据来源不清晰，命名冲突）
4. 增加了 Fragment(父节点), Teleport(传送门), Suspense(异步组件)
5. ref(普通值变成响应式，底层采用defineProperty )， reactive(让一个对象变成响应式)

#### 其他
1. reactive(一个对象所有层变成响应式)、shallowReactive(一个对象第一层变成响应式)、readonly(响应式全部不可更改)、shallowReadonly(响应式只有第一层不可更改)

### vue3比较核心的模块
reactivity（响应式）， runtime-core(与平台无关的运行时)， runtime-dom（针对浏览器的运行时）， compiler-core(编译的核心),compiler-sfc/ssr/dom(针对某个特定方面的编译,shared(多个包共享), vue(完整版本，包括运行时和编译器) 


## 搭建modrepo项目
必须使用yarn，目前只有yarn才支持（因为执行：yarn install的时候，会自动把packages(workspaces配置的)放入到node_modules中去）。

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

## 一些问题

1. ref内部使用defineProperty。因为ref实现是基于es6-》class set get。es6就是es5创建对象的语法糖，也就是defineProperty
ref为什么要用class

2. toRefs响应式解构，解构后还是响应式，只是调用的时候要加.value, 使用场景。类似于map辅助函数，少些一点。

## 里程碑
1. reactivity
2. ref
3. toRef,响应式解构 toRefs
4. effect track trigger


## 展望
effect并没有合并功能 watchEffect -> runtime-core -> watch -> watch flush post