// 本章内容
// 1. 使用master公式计算递归的时间复杂度
// 2. 归并排序
// 3. 荷兰国旗 快排

/**
 * 公共方法 交换数组
 * @param {*} arr 
 * @param {*} i 
 * @param {*} j 
 * @returns 
 */
function swap(arr, i, j) {
  if(i === j) return
  arr[i] = arr[i] ^ arr[j]
  arr[j] = arr[i] ^ arr[j]
  arr[i] = arr[i] ^ arr[j]
}



// 递归版本： arr[L~R]的最大值
// 画出执行树，理解树的遍历（左中右）
// 理解出栈与压栈的执行过程
// 找数组中的最大值
function process1(arr, l, r) {
  if(l === r) return arr[l]
  let mid = l + ((r - l) >> 1 )
  let leftMax = process(arr, l, mid)
  let rightMax = process(arr, mid + 1, r)
  return Math.max(leftMax, rightMax)
}

let arr = [1, 2, 3,5,8,1,5,7,9,6]

// 递归的时间复杂度 ===》 理解master公式
// 母问题拆分 =》 子问题
// 决策过程
// T(N) = a * T(N/b) + O(N^c)

// ===> 推出三种情况


// 归并排序（mergesort）
// 双指针


function merge (arr, l, mid, r) {
  const help = new Array(r - l + 1)
  let i = 0
  let p1 = l
  let p2 = mid + 1
  // 越界检查
  while (p1 <= mid && p2 <= r) {
    help[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++]
  }
  // 有一个越界, 就把那个剩下的拷贝到help后面
  while (p1 <= mid) {
    help[i++] = arr[p1++]
  }
  while (p2 <= r) {
    help[i++] = arr[p2++]
  }
  // help 有序 将help拷贝到arr
  for (let i = 0; i < help.length; i ++) {
    arr[l + i] = help[i]
  }
}

function process(arr, l, r) {
  if (l === r) return
  const mid = l + ((r - l) >> 1)
  process(arr, l, mid)
  process(arr, mid + 1, r)
  merge(arr, l, mid, r)
}

let arr2 = [1, 4, 6, 2, 5, 8]
process(arr2, 0, arr2.length - 1)

// ===> master公式 T(N) = 2*(N/2) + O(N)
// ===> a = 2 b = 2 c = 1
// O(N * logN)
// 选择 冒泡 插入 O(N^2) 等差数列


// 归并 ====》 小和问题

const arr3 = [1, 3, 4,  2, 5]

function process3(arr, l, r) {
  if (l === r) return 0
  const mid = l + ((r - l) >> 1)
  return  process3(arr, l, mid) + process3(arr, mid + 1, r) + merge3(arr, l, mid, r)
}

function merge3(arr, l, mid, r) {
  const help = new Array(r - l + 1)
  let  i = 0
  let p1 = l 
  let p2 = mid + 1
  let res = 0
  while(p1 <= mid && p2 <= r) {
    if(arr[p1] < arr[p2]) {
      help[i++] = arr[p1]
      // console.log(arr[p1] + '*' + (r - p2 + 1))
      res += arr[p1++] * (r - p2 + 1)
    } else {
      help[i++] = arr[p2++]
    }
  }
  while (p1 <= mid) {
    help[i++] = arr[p1++]
  }
  while (p2 <= r) {
    help[i++] = arr[p2++]
  }
  for (let i = 0; i < help.length; i ++) {
    arr[l + i] = help[i]
  }
  return res
}


// 归并 逆序对

// merge soft 改写的题 每年必考


// ------ 快排  ----- 荷兰国旗 ----- 双指针


function dutch (arr, num) {
  let i = 0;
  let min = -1
  let max = arr.length 
  while (i < max) {
    if (arr[i] < num) {
      swap(arr, ++min, i)
      i++
    } else if (arr[i] === num) {
      i++
    } else {
      swap(arr, --max, i)
    }
  }
}


let arr4 = [1,2,0,5,6,8,9,5,3,4,6,5]

dutch(arr4, 5)


// 快排1.0   
// 快排2.0  ===> 时间复杂度 O(N^2)
// 快排3.0（概率事件）O(N*logN) 累加的长期期望
// 快排 额外空间复杂度: logN级别

function quickSort(arr, l, r) {
  if(l < r) {
    const res = partation(arr, l, r)
    // console.log(res)
    // const res2 = partation(arr, l, res[0])
    // console.log(res2)
    // debugger
    // const res3 = partation(arr, res[1], r)
    // console.log(res3)
    quickSort(arr, l, res[0])
    quickSort(arr, res[1], r)
  }
}

function partation(arr, l, r) {
  let i = l;
  let min = l - 1
  let max = r + 1
  let num = arr[r]
  while (i < max) {
    if (arr[i] < num) {
      swap(arr, ++min, i)
      i++
    } else if (arr[i] === num) {
      i++
    } else {
      swap(arr, --max, i)
    }
  }
  console.log(arr)
  return [min, max]
}

const arr5 = [2,4,8,1,3,4,9,3,2,9,6,11,13,5,7,8]

quickSort(arr5, 0, arr5.length - 1)





