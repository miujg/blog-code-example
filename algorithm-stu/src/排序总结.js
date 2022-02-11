/**
 * 排序的总结 
 */


// 常规排序方法： 插入 冒泡 选择 
// 可参考菜鸟：https://www.runoob.com/w3cnote/sort-algorithm-summary.html

// 位运算
function swap(arr, i, j) {
  if (i === j) return
  arr[i] = arr[i] ^ arr[j]
  arr[j] = arr[i] ^ arr[j]
  arr[i] = arr[i] ^ arr[j]
}

const arr = [1, 4, 67, 34, 1, 0, 9, 20]

// 冒泡
// 思路：1. 两两比较 小的下沉， 大的向后
// 时间复杂度为O(N^2)
function bubbleSort (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) swap(arr, j, j + 1)
    }
  }
}

// 选择 
function selectSort(arr) {
  for (let i = 0; i < arr.length - 1; i++ ) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) swap(arr, i, j)
    }
  }
}

selectSort(arr)

// 插入 （类似摸牌）
function insertSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (arr[j] < arr[j - 1]) swap(arr, j, j - 1)
      else break
    }
  }
}
insertSort(arr)


// 递归与master公式
// 求最大值
// 左边的最大值  右边的最大值 ===》 Math.max  ===》 总的最大值
function process(arr, l, r) {
  if(l === r) return arr[l]
  // 位运算获取重点
  let mid = l + ((r - l) >> 1 )
  let leftMax = process(arr, l, mid)
  let rightMax = process(arr, mid + 1, r)
  return Math.max(leftMax, rightMax)
}
let max = process(arr, 0, arr.length - 1)

// 归并排序
// 左边有序  右边有序  ===》 merge ===》 总的有序

const arr1 = [7,5,6,4]

function mergeSort(arr, l, r) {
  if(l === r) return arr[l]
  // 算出中点
  let mid = l + ((r - l) >> 1 )
  // 左边有序
  mergeSort(arr, l, mid)
  // 右边有序
  mergeSort(arr, mid + 1, r)
  // 左边和右边通过merge 整个有序
  merge(arr, l, mid, r)
}

function merge(arr, l, mid, r) {
  const help = []
  let i = l
  let j = mid + 1
  while (i <= mid && j <= r) {
    arr[i] > arr[j] ? help.push(arr[i++]) : help.push(arr[j++])
  }
  while (i <= mid) {
    help.push(arr[i++])
  }
  while (j <= r) {
    help.push(arr[j++])
  }
  for (let i = 0; i < help.length; i++) {
    arr[i+l] = help[i]
  }
}

mergeSort(arr1, 0, arr1.length - 1)

// 逆序列对 && 小和问题 
// 左边的小和 右边的小和  ==》 func ==》整个的小和

const arr2 = [7,5,6,4]
function reversePairs(arr, l, r) {
  if (l === r) return 0
  const mid = l + ((r - l) >> 1)
  return  reversePairs(arr, l, mid) + reversePairs(arr, mid + 1, r) + merge1(arr, l, mid, r)
}

function merge1(arr, l, mid, r) {
  const help = []
  let i = l
  let j = mid + 1
  let res = 0
  while (i <= mid && j <= r) {
    if(arr[i] > arr[j]) {
      res += r - j + 1
      help.push(arr[i++])
    } else {
      help.push(arr[j++])
    }
  }
  while (i <= mid) {
    help.push(arr[i++])
  }
  while (j <= r) {
    help.push(arr[j++])
  }
  for (let i = 0; i < help.length; i++) {
    arr[i+l] = help[i]
  }
  return res
}

const num = reversePairs(arr2, 0, arr2.length - 1)
console.log(num)


// 快排 三个版本

const arr3 = [1,2,5,9,1,6,3]

function quickSort(arr,l,r) {
  if(l < r) {
    const res = partation(arr, l, r)
    quickSort(arr, l, res - 1)
    quickSort(arr, res+1, r)
  }
}

function partation(arr, l, r) {
  let min = l - 1
  let max = r 
  let num = arr[r]
  let i = l
  while (i < max) {
    if (arr[i] <= num) {
      swap(arr, ++min, i++)
    } else {
      swap(arr, --max, i)
    }
  }
  swap(arr, i , r)
  return i
}

quickSort(arr3, 0 , arr3.length - 1)
console.log(arr3)