// 堆排
function swap(arr, i, j) {
  if(i === j) return
  arr[i] = arr[i] ^ arr[j]
  arr[j] = arr[i] ^ arr[j]
  arr[i] = arr[i] ^ arr[j]
}
// 堆 完全二叉树（从左往右依次是满的）
// 数组从0出发连续的一段 可以表示完全二叉树

// 大根堆 （根最大） helpInsert
// 小根堆 （根最小）



function heapInsert(arr, i) {
  while (arr[i] > arr[fomatnum((i - 1)/2)]) {
    swap(arr, i, fomatnum((i-1)/2))
    i = fomatnum((i-1)/2)
  }
}

/**
 * 
 * @param {*} arr 
 * @param {*} i 从什么位置做heapify
 * @param {*} heapSize 判断左右是否越界
 */
function heapify(arr, i, heapSize) {
  let left = i * 2 + 1
  while(left < heapSize) {

    // 判断有没有右孩子，并且 比较 左右孩子的大小
    let largest = left + 1 < heapSize && arr[left + 1] > arr[left] ? left + 1 : left

    // 上面的largest 与父 比较
    largest = arr[largest] > arr[i] ? largest : i

    // 父就是最大的， 流程结束，此时就是一个
    if (largest === i) break
    swap(arr, i, largest)
    i = largest
    left = i * 2 + 1
  }
}


function fomatnum (num) {
  return parseInt(Math.abs(num))
}

// 堆排序
// 1. 变成大根堆
// 2. 头尾交换， heapSize -- 
// 时间复杂度
// 遍历： O(N*logN)
// 空间复杂度 O(1) （只有堆做到了）
// mergeSort 空间 O(N) 快排 O(logN)


function heapSort (arr) {
  if( !Array.isArray(arr) ||  arr.length < 2) return
  // 变成大根堆
  for(let i = 0; i < arr.length; i++) { // O(N)
    heapInsert(arr, i) // O(logN)
  }

  // 另一种更快的大根堆变换 时间复杂度 更低
  // for(let i = arr.length - 1; i >= 0; i--) {
  //   heapify(arr, i, arr.length)
  // }

  let heapSize = arr.length
  swap(arr, 0, --heapSize)
  while(heapSize > 0) {
    heapify(arr, 0, heapSize) // O(logN)
    swap(arr, 0, --heapSize)
  }
}

const arr = [1,4,6,7,8, 2]

heapSort(arr)
console.log(arr)


// 已知一个几乎有序的数组，选择排序方式。 （小根堆）
// 时间复杂度: N * logK （k很小，直接 O(N)）


// 手写堆

// 比较器 
// 1.c++重载运算符
// 2. 类似 sort里面的规则函数


// -----------------------------
// 桶排序
// 应用场景（根据数据状况，数据有一定范围，进行定制。不基于比较的排序）
// 计数排序 
// eg: 对员工的年龄进行排序
// 1. 年龄有范围（16~65）
// 16岁有多少个  18岁有多少个 ----》 倒出来


// 基数排序


// 排序稳定性，理解

// 选择 不能
// 冒泡 插入可以
// 归并 可以
// 快排不可以
// 堆排 不可以
// 捅排 可以 （不基于比较的排序，基本能做到稳定性）




