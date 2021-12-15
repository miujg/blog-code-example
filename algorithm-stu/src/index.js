import { Node, Three, BSTThree } from './structure/tree'

const three = new Three()
three.createThreeByArr([1,2,3,4,5,6,7, 8, 9])
// three.insertByVal(9, 11, 'right')
const root = three.getRoot()
// three.preOrderTraverse(three.getRoot())
// three.inOrderTraverse(three.getRoot())
// three.postOrderTraverse(three.getRoot())
// three.preOrderTraverse(three.getRoot())
// three.postOrderTraverseIteration(root)
// three.inOrderTraverseIteration(root)
// console.log(three.getMaxwidth(root))

const bst = new BSTThree
bst.createThreeByArr([5,3,7,2,4,6,8,9,])
// bst.inOrderTraverse(bst.getRoot())
// console.log(bst.isBST(three.getRoot()))

// console.log(three.isBanlanced(three.getRoot()))
// console.log(three.isBST(bst.getRoot()))
// console.log(three.isBSTDp(bst.getRoot()))


// 满二叉树测试

const three1 = new Three()
three1.createThreeByArr([1,2,3,4,5,6,7])
// console.log(three1.isCBT(three1.getRoot()))
// console.log(three1.max())
// console.log(three1.getHeight())

// 寻找两个节点的公共祖先 
// 变量过程生成祖先链

const three2 = new Three()
three2.createThreeByArr([1,2,3,4,5,6,7, 8, 9])
// console.log(three2.getNodeByVal(3))

let res = three2.getLca(three2.getNodeByVal(9), three2.getNodeByVal(2))
console.log(res)

console.log(three2.getLca2(three2.getNodeByVal(9), three2.getNodeByVal(2)))




// 先序序列化
const three3 = new Three()
three3.createThreeByArr([1,2,3,4])
// 1_2_4_#_#_#_3_#_#_
const serialStr = three3.serialByPre()
console.log(three3.reconByPre(serialStr))
