// 异或
// 结合律 交换律 （无进位计算）

// let a = 10 
// let b = 11

// 使用异或来交换数据 不需要开辟新空间
// 交换的两个变量在内存中的地址不一样
// a = a ^ b
// b = a ^ b
// a = a ^ b

// 异或题目
// 一个数组， 一个数出现奇数次  其他数出现偶数次
// 在时间复杂度O(N) 空间复杂度 O(1)的要求下
// 使用异或操作符写出程序 (秒呀)

// let arr = [1, 1, 1, 0, 0, 2, 2, 2, 3]
// let eor = 0
// let result
// arr.forEach(item => result = item ^ eor)


// 一个数组， 两个数出现奇数次  其他数出现偶数次
// 在时间复杂度O(N) 空间复杂度 O(1)的要求下
// 使用异或操作符写出程序 (秒呀)

let arr1 = [1,1,1, 3,3,3, 2,2,2,2, 4,4, 6,6]

function printOddTimesNum2(arr) {
  let eor = 0
  arr.forEach(item => eor = item ^ eor)
  // 找到 eor 从右边数起第一位为1的项
  // ~取反， &与
  // 结果为 2的n次方 这个n就是右边起第几位
  let rightOne = eor & (~eor + 1)

  let onlyOne = 0
  arr.forEach(item => {
    if((item & rightOne) != 0) {
      debugger
      onlyOne = onlyOne ^ item
    }
  })

  let eor2 = onlyOne ^ eor

  return { onlyOne,  eor2}
}

let { onlyOne, eor2 } = printOddTimesNum2(arr1)
console.log(onlyOne, eor2)

// let a = 0b0011110110000 
// console.log(a & (~a + 1))



