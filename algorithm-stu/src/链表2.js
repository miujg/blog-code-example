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
  let newHead = null
  while (head) {
    linkMap.set(head, new Node(head.element))
    head = head.next
  }
  // 2.遍历map设置每个新节点的random和next
  for (let oldNode of linkMap.keys()) {
    let newNode = linkMap.get(oldNode)
    newNode.next = linkMap.get(oldNode.next)
    newNode.random = linkMap.get(oldNode.random)
    if (!newHead) newHead = newNode
  }
  return newHead
}

// 考虑额外空间
function newCloneRandomLink(head) {
  let curent = head 
  // 在每个节点后面插入新节点
  while(curent) {
    const next = curent.next
    const newNode = new Node(curent.element) 
    curent.next = newNode
    newNode.next = next
    curent = next
  }
  // 每次遍历两个设置 新节点的random
  curent = head
  while(curent) {
    const newNode = curent.next
    newNode.random = curent.random ? curent.random.next : null
    curent = curent.next.next
  }
  // 分离新旧链表
  curent = head
  const res = curent.next
  while(curent.next && curent.next.next) {
    const newNode = curent.next
    curent.next = newNode.next
    newNode.next = newNode.next.next
    curent = curent.next
  }
  return res
}

const head = createRandomLink()

const newHead = newCloneRandomLink(head)

// headTostring(newHead)

/******************************** */
// 判断有环还是无环，返回入环节点

function createCicle() {
  const link = new LinkedList()
  link.push(1)
  link.push(2)
  link.push(3)
  link.push(4)
  link.push(5)
  link.push(6)
  link.getElementAt(5).next = link.getElementAt(2)
  return link.getHead()
}

// 使用快慢指针 得到入环节点， 如果没有环则返回null
function isCicle(head) {
  // 快慢指针
  let n1 = null
  let n2 = null
  // 入环节点
  let n3 = null
  // 边界问题探讨
  if (head.next && head.next.next) {
    n1 = head.next 
    n2 = n1.next
  } else {
    return n3
  }
  while (n2 != null && n1 !== n2) {
    n1 = n1.next
    n2 = n2.next ? n2.next.next : null
  }
  // 有环
  if (n2 != null) {
    n2 = head
    while (n2 !== n1) {
      n2 = n2.next
      n1 = n1.next
    }
    n3 = n1
  }
  console.log(n3)
  return n3
}
// createCicle()

let head1 = createLinkByArr([1,2,3,4,5]).getHead()
let head2 = createCicle()

isCicle(head2)


