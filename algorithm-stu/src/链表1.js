// 单项链表类
import LinkedList, { Node } from "./structure/link"

function headTostring (head) {
  let arr = []
  while (head) {
    arr.push(head.element)
    head = head.next
  }
  console.log(arr.join(','))
}

function createLinkByArr (arr) {
  const linkList = new LinkedList()
  arr.forEach(item => linkList.push(item))
  return linkList
}

/******************************** */
// 反转单向链表

const reverseLink = createLinkByArr([1,2,3,4])
const reverseLinkHead = reverseLink.getHead()

function reverse (head) {
  let n1 = head
  let n2 = head.next
  let n3 = null
  while (n2 != null) {
    n3 = n2.next
    n2.next = n1
    if (n1 === head) n1.next = undefined
    n1 = n2 
    n2 = n3
  }
  return n1
}


// 循环引用问题
// const n1 = new Node(1)
// const n2 = new Node(2)
// n1.next = n2
// n2.next = n1
// console.log(n1)
// console.log(n2)

// console.log(reverseLink.toString(reverse(reverseLinkHead)))


/******************************** */



/******************************** */
// 判断回文


// 判断一个链表是否是回文
// 1. 不考虑空间复杂度的情况下,使用栈，最暴力：

function isPalindrome (link) {
  let flag = true
  const size = link.size()
  const stack = []
  if (size < 2) return true
  let node = link.getHead()
  while (node != null) {
    stack.push(node.element)
    node = node.next
  }
  node = link.getHead()
  while (node != null) {
    if (node.element !== stack.pop()) {
      flag = false
      break
    }
    node = node.next
  }
  return flag
}

// 2. 稍微优化, 使用快慢指针将中点之后部分压入栈。节省一半的空间
// 需要考虑边界情况
function isPalindrome1 (link) {
  let flag = true
  const size = link.size()
  if (size < 2) return true
  // 慢指针
  let node = link.getHead()
  // 快指针
  let qNode = link.getHead()
  const stack = []
  while (qNode != null && qNode.next != null) {
    node = node.next
    qNode = qNode.next.next
  }
  // 奇数 再往后移动一位
  if (qNode && qNode.next == null) node = node.next
  while (node != null) {
    stack.push(node.element)
    node = node.next
  }
  node = link.getHead()
  while (stack.length > 0) {
    if(node.element !== stack.pop()) {
      flag = false
      break
    }
    node = node.next
  }
  return flag
}

const linkList1 = createLinkByArr([1,1])

// 3.以上两种算法时间复杂度度 O(n) 空间复杂度 O(n)
// 考虑只使用有限几个变量来实现该功能 空间复杂度变为O(1)
// 要做这个得先学会反转单向链表

function isPalindrome3 (head) {
  let flag = true
  // 慢指针起点 中点位置 奇数往后y
  let n1 = head
  // 快指针起点
  let qNode = head
  while (qNode != null && qNode.next != null) {
    n1 = n1.next
    qNode = qNode.next.next
  }
  let n2 = n1.next
  // 临时存储状态的一个变量
  let n3 = null
  n1.next = null
  while (n2 != null) {
    n3 = n2.next
    n2.next = n1
    n1 = n2
    n2 = n3
  }
  // 此时 n1 在尾部  
  n2 = head
  while(n1 != null && n2 != null) {
    if (n1.element !== n2.element) {
      flag = false
      break
    }
    n1 = n1.next
    n2 = n2.next
  }
  return flag
}

// console.log(isPalindrome3(createLinkByArr([1,2,3,4,3,2,1]).getHead()))

/******************************** */
// 链表荷兰国旗问题

// 不考虑空间复杂度
// 讲链表放入数组， 

const hnHead = createLinkByArr([3,5,4,6,5,8,9,1,2]).getHead()

function hnSort(head, num) {
  let sh, st, eh, et, bh, bt
  while (head != null) {
    const val = head.element
    if (val < num) {
      if (!sh) {
        sh = head
        st = head
      } else {
        st.next = head
        st = head
      }
    } else if (val > num) {
      if (!bh) {
        bh = head
        bt = head
      } else {
        bt.next = head
        bt = head
      }
    } else {
      if (!eh) {
        eh = head
        et = head
      } else {
        et.next = head
        et = head
      }
    }
  }
  headTostring(sh)
}

hnSort(hnHead, 5)


/******************************** */
// 克隆含有随机指针的链表

// 创建一段随机指针链表
function createRandomLink() {
  const n1 = new Node(1)
  const n2 = new Node(2)
  const n3 = new Node(3)
  const n4 = new Node(4)

  n1.next = n2
  n2.next = n3
  n3.next = n4

  n1.random = n2 
  n2.random = n3 
  n4.random = null

  return n1
}

// 不考虑额外空间，使用map

function cloneRandomLink(head) {
  // 1. 遍历老链表，创建新节点，推入map
  const linkMap = new Map()
  const newHead = null
  while (head) {
    linkMap.set(head, new Node(head.element))
    head = head.next
  }
  // 2.遍历map设置每个新节点的random和next
  for (let oldNode of linkMap.keys()) {
    const newNode = linkMap.get(oldNode)
    newNode.next = linkMap.get(oldNode.next)
    newNode.random = linkMap.get(oldNode.random)
    if (!newHead) newHead = newNode
  }
  return newHead
}

let newHead = cloneRandomLink(createRandomLink())
while(newHead) {
  console.log(newHead)
  newHead = newHead.next
}

/******************************** */
// 无环 有环链表相交问题







