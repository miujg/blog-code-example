import { Node, Three } from './structure/tree'

const three = new Three()
three.createThreeByArr([1,2,3,4,5,6,7, 8, 9, 10, 11, 12])
const root = three.getRoot()
// three.preOrderTraverse(three.getRoot())
// three.inOrderTraverse(three.getRoot())
// three.postOrderTraverse(three.getRoot())
// three.preOrderTraverse(three.getRoot())
// three.postOrderTraverseIteration(root)
// three.inOrderTraverseIteration(root)
console.log(three.getMaxwidth(root))