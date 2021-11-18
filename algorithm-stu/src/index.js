// 递归相关

// 递归版本： arr[L~R]的最大值
// 画出执行树，理解树的遍历（中左右）
// 理解出栈与压栈的执行过程
function process(arr, l, r) {
  if(l === r) return arr[l]
  let mid = l + ((r - l) >> 1 )
  let leftMax = process(arr, l, mid)
  let rightMax = process(arr, mid + 1, r)
  return Math.max(leftMax, rightMax)
}

let arr = [1, 2, 3,5,8,1,5,7,9,6]

console.log(process(arr, 0, 5))

// 理解master公式
// 母问题拆分 =》 子问题
// 决策过程
// T(N) = a * T(N/b) + O(N^b)