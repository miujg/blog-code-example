// 异或：判断两个变量是否不同， 不同返回true， 相同返回false

var a = true
var b = false

a ^ a // false
a ^ b // true
b ^ a // true
b ^ b // false

// 重点
// 1. 一个值与自身异或 == false
// 2. 一个值与0异或 == 本身
// 3. 交换律
// 4. 结合律

// 应用交换两个数
// 如果交换的变量是同一个地址，该方法不适用
function swap (x, y) {
  x = x ^ y
  y = x ^ y
  x = x ^ y
}

// 异或的题目

// 1. 一个数组，一个数出现奇数次，其他偶数次。找出这个数（全部异或）

// 2. 一个数组， 两个数出现奇数次  其他数出现偶数次(找出这两个数)

let arr1 = [1,1,1,1, 3,3,3, 2,2,2,2, 4,4, 6,6, 11]
// 不妨设这两个数为 a 和 b。 
function printOddTimesNum2(arr) {
  let eor = 0
  arr.forEach(item => eor = item ^ eor)
  // 此时 eor 为 a ^ b
  // a != b  推出 a ^ b != 0 推出 eor的二级制肯定至少有一位不等于0
  // 假设eor在第八位上不等于0 推出 a 和 b 在第八位上不相等
  // 用eor1去异或第八位上不等于0的， 则eor1就等于 a 或者 b（重点理解）
  // 上面那一步相当于 把a 和 b成了两个阵营。每个阵营都是一个数出现奇数次，其余偶数
  // 事情就好办了

  // 从右边开始，第一位为1的书。 eg： 1010 = 2
  // 位运算 (补码)
  let rightOne = eor & (~eor + 1)

  let onlyOne = 0
  arr.forEach(item => {
    // 判断第x为上不为0的数
    if((item & rightOne) === rightOne) {
      onlyOne = onlyOne ^ item
    }
  })

  let eor2 = onlyOne ^ eor

  return { onlyOne,  eor2}
}

let { onlyOne, eor2 } = printOddTimesNum2(arr1)
console.log(onlyOne, eor2)

