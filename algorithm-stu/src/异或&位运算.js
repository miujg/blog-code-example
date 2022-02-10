// 异或  位运算  常见面试题
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

let arr1 = [1,1,1,1, 3,3,3, 2,2,2,2, 4,4, 6,6, 11]

function printOddTimesNum2(arr) {
  let eor = 0
  arr.forEach(item => eor = item ^ eor)
  // 找到 eor 从右边数起第一位为1的项
  // ~取反， &与
  // 1101101000  =》  1000 理解
  let rightOne = eor & (~eor + 1)

  let onlyOne = 0
  arr.forEach(item => {
    // 注意这里的判断 理解
    if((item & rightOne) === rightOne) {
      onlyOne = onlyOne ^ item
    }
  })

  let eor2 = onlyOne ^ eor

  return { onlyOne,  eor2}
}

let { onlyOne, eor2 } = printOddTimesNum2(arr1)
console.log(onlyOne, eor2)

// 一个数组包含 n-1 个成员，这些成员是 1 到 n 之间的整数，且没有重复，请找出缺少的那个数字。
// 最快的解答方法，就是把所有数组成员（A[0] 一直到 A[n-2]）与 1 到 n 的整数全部放在一起，进行异或运算。
// 两两配对为0 ， 没配上对的露出



