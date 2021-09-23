##
- npm install rollup @babel/core @babel/prest-env rollup-plugin-babel rollup-plugin-serve cross-env --save-dev


### 初渲染流程
1. 对数据进行拦截 对象 数组 （依赖搜集）
2. template（模板） ==》 AST语法树 ==》render函数 ==》虚拟dom（vdom）
3. new Vue产生Watcher（渲染Watcher）,调用_update(虚拟dom ==》真实dom), _render(生产虚拟dom)