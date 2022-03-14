
// const arr = [1,8,5,3,4,9,7,6,0]
const arr = [2,3,1,5,6,8,7,9, 4]

function getSequence(arr) {
  const len = arr.length 
  // 返回递增的索引
  const result = [0]
  const p = arr.slice(0)
  let start
  let end
  let middle
  for (let i = 0; i < len; i++) {
    const arrI = arr[i]
    // 为0的时候表示要删除,这种情况不需要排
    if (arrI !== 0) {
      // result的最后一项（索引）
      let resultLastIndex = result[result.length - 1]
      // 如果result的最后一项 小于 arr当前项， 直接添加到后面
      if (arr[resultLastIndex] < arrI) {
        // 将索引加入进去 
        // 每次放的时候，让这一项记录前一项
        p[i] = resultLastIndex 
        result.push(i)
        // 跳出循环
        continue
      }
      start = 0,
      end = result.length - 1
      while (start < end) { // 重合说明找到
        middle = ((start + end) / 2) | 0
        if(arr[result[middle]] < arrI) {
          start = middle + 1
        } else {
          end = middle - 1
        }
      }
      if(arrI < arr[result[start]]) {
        if (start > 0) { //替换
          p[i] = result[start - 1]
        }
        result[start] = i

      }
    }
  }
  console.log(p)
  let len1 = result.length - 1
  let last = result[len1 - 1]
  while (len1-- > 0) { // 根据前驱节点 
    result[len1] = last
    last = p[last]
  }
  return result
}

console.log(getSequence(arr))