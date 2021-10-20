// 类型断言


// 联合类型

// 无初始化的情况下：
let str: string | number // 没有初始化的时候 会调用string number的共同方法

// 断言
let ele:HTMLElement | null = document.getElementById('app')
// 这里会报错 你确定ele有值了，不会做非空判断 ！为ts语法
// ele!.style.color = 'red' 
// 标识非空断言 ? es11 语法 只能取值
console.log(ele?.style.color) // => ele === null || ele === void 0 ? void 0 : ele.style.color

//可以做断言操作 as
let ele1 = document.getElementById('app');

// 只能断言成有的类型 这里ele1 只能as断言为 HTMLElement | null
// 如果你一定要断言成其他的: (ele1 as any) as boolean 无意义，暴力 影响原始类型
// (ele1 as HTMLElement).style.color // 等价于！ 排除null 相较来说 ？更安全 但是只能取值



// 字面量类型
let direction: 'up' | 'down' | 'left' | 'right'
// 类型别名
type Direction = 'up' | 'down' | 'left' | 'right'