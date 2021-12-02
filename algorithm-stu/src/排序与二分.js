// 各种排序 时间复杂度 等。。。。

// 公共方法 交换数组的两列
function swap(arr, i, j) {
  arr[i] = arr[i] ^ arr[j]
  arr[j] = arr[i] ^ arr[j]
  arr[i] = arr[i] ^ arr[j]
}

// 1) 选择

// 2） 冒泡

// 3) 插入排序
// 时间复杂度：O(n^2)

let arr3 = [1,2,5,2,6,9,11,6,32]

function insertSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (arr[j] < arr[j - 1]) swap(arr, j, j - 1)
    }
  }
}

insertionSort(arr3)
console.log(arr3)

// 4) 二分法 查找某个数
// 非前提： 有序数组（也可以非无序）
// 时间复杂度： O(logN)

// 4.1 找某一个数 二分查找 找到返回
// 4.2 找>=某个数最左侧的位置 二分到底
// 4.3 局部（定义）最小值


// 5) 对数器



