import { Tree } from "./tree";
import { prettyPrint, randomNumArr } from "./utility";




/** tests **/

const driverScript = function () {
  const arr = randomNumArr(30, 0, 30)
  const testTree = new Tree(arr);
  prettyPrint(testTree.tree)
  console.log(`Is the tree balanced? ${testTree.isTreeBalanced()}`)
  console.log(`Level order: ${testTree.levelOrder()}`)
  console.log(`preorder: ${testTree.preorder()}`)
  console.log(`postorder: ${testTree.postorder()}`)
  console.log(`innorder: ${testTree.inorder()}`)
  console.log('add several > 100 numbers to inbalance tree')
  testTree.insert(101)
  testTree.insert(102)
  testTree.insert(103)
  testTree.insert(104)
  testTree.insert(105) 
  console.log(`Is the tree balanced? ${testTree.isTreeBalanced()}`)
  console.log('call the rebalance function')
  testTree.rebalance()
  console.log(`Is the tree balanced? ${testTree.isTreeBalanced()}`)
  console.log(`Level order: ${testTree.levelOrder()}`)
  console.log(`preorder: ${testTree.preorder()}`)
  console.log(`postorder: ${testTree.postorder()}`)
  console.log(`innorder: ${testTree.inorder()}`)
}

driverScript()