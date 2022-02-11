// 归并排序
// 1. 理解递归序 (树的遍历)
// 2. 递归master公式（子问题等规模的递归）
// 3. 归并排序

import Stack from "./structure/stack"


const arr = createArr(10)
console.log(arr)
console.log('---------------------')

// 交换arr[i] 与 arr[j]
function swap(arr, i, j) {
  if (i === j) return
  arr[i] = arr[i] ^ arr[j]
  arr[j] = arr[i] ^ arr[j]
  arr[i] = arr[i] ^ arr[j]
}

// 创建数组
function createArr(n) {
  const arr = []
  for(let i = 0; i < n; i++) {
    arr.push(Math.ceil(100* Math.random()))
  }
  return arr
}


// 递归求最大值：
function processMax(arr, l = 0, r = arr.length - 1) {
  if (l === r) return arr[l]
  let mid = l + ((r -l) >> 1)
  // 左边最大值
  let leftMax = processMax(arr, l, mid)
  // 右边最大值
  let rightMax = processMax(arr, mid + 1, r)
  // Math.max(左边最大值，右边最大值) ==》 总的最大值
  return Math.max(leftMax, rightMax)
}


function mergeSort(arr, l = 0, r = arr.length - 1) {
  if (l === r) return arr[l]
  let mid = l + ((r - l) >> 1)
  // 左边有序
  mergeSort(arr, l, mid)
  // 右边有序
  mergeSort(arr, mid + 1, r)
  // 左边右边合并有序
  merge(arr, l, mid, r)
}

function merge(arr, l, mid, r) {
  // 合并 [l,mid]  [mid+1, r]
  // 1.设置两个指针,指针1==>l  指针2==>mid+1
  // 2.比较两个指针所指的值，小的推入help数组，向右边移动
  // 3.周而复始，两者指针都遍历一遍之后就 help有序
  let help = []
  let i = l
  let j = mid + 1

  while(i <= mid && j <= r) {
    arr[i] < arr[j] ? help.push(arr[i++]) : help.push(arr[j++])
  }

  while(i <= mid) {
    help.push(arr[i++])
  }

  while(j <= r) {
    help.push(arr[j++])
  }
  // 将help拷贝给arr 注意起点位置
  help.forEach((item,index) => arr[index + l] = item)
}

// mergeSort(arr)
// console.log(arr)

// 迭代方式实现 归并排序 todo

// 归并 ====》 小和问题
// 在数组中，左边比当前数小的数，累加的结果
// 如： 数组 [1, 3, 4,  2, 5]
// 1 左边比它小的： null
// 3 左边比它小的： 1
// 4 左边比它小的： 1,3
// 2 左边比它小的： 1
// 5 左边比它小的： 1,3,4,2
// 结果累加


const arr3 = [1, 3, 4,  2, 5]

// 双指针 暴力破解
// 时间复杂度（等差数列）：O(n^2)
function smallCount(arr) {
  let sum= 0
  let j = 1
  while(j <= arr.length) {
    let i = 0
    // let result = `比${j}:${arr[j]}小的：`
    while(i < j) {
      if(arr[i] < arr[j]) {
        // result += arr[i] + ','
        sum += arr[i]
      }
      i++
    }
    j++
  }
  return sum 
}

// 转换思路（排序过程统计）
// 1, 3, 4,  2, 5
// 1: 右侧比1打的数有 4个
// 3: 右侧比3打的数有 2个
// 4: 右侧比4打的数有 1个
// 2: 右侧比4打的数有 1个
// 1*4 + 3*2 + 4*1 + 2*1


function smallCount1(arr, l = 0, r = arr.length - 1) {
  if(l === r) return 0
  let mid = l + ((r - l) >> 1 )
  return smallCount1(arr, l, mid) + smallCount1(arr, mid + 1, r) + merge1(arr, l, mid, r)
}

function merge1(arr, l, mid, r) {
  let i = l
  let j = mid + 1
  let help = []
  let res = 0

  while(i <= mid && j <= r) {
    // arr[i] < arr[j] ? help.push(arr[i++]) : help.push(arr[j++])
    if(arr[i] < arr[j]) {
      help.push(arr[i])
      res += arr[i++] * (r - j + 1)
    } else {
      help.push(arr[j++])
    }
  }

  while(i <= mid) {
    help.push(arr[i++])
  }

  while(j <= r) {
    help.push(arr[j++])
  }
  // 将help拷贝给arr 注意起点位置
  help.forEach((item,index) => arr[index + l] = item)
  return res
}

// 数组中的逆序对


function nxd(arr, l = 0, r = arr.length - 1) {
  if(l === r) return 0
  let mid = l + ((r - l) >> 1 )
  return nxd(arr, l, mid) + nxd(arr, mid + 1, r) + nxdMerge(arr, l, mid, r)
}

function nxdMerge(arr, l, mid, r) {
  let i = l
  let j = mid + 1
  let help = []
  let res = 0

  while(i <= mid && j <= r) {
    // arr[i] < arr[j] ? help.push(arr[i++]) : help.push(arr[j++])
    if(arr[i] > arr[j]) {
      help.push(arr[i++])
      res += (r - j + 1)
    } else {
      help.push(arr[j++])
    }
  }

  while(i <= mid) {
    help.push(arr[i++])
  }

  while(j <= r) {
    help.push(arr[j++])
  }
  // 将help拷贝给arr 注意起点位置
  help.forEach((item,index) => arr[index + l] = item)
  return res
}