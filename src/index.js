import { Tree } from "./tree";
import { prettyPrint } from "./utility";




/** tests **/

const newTree = new Tree([
  1, 2, 3, 4, 5, 6, 7, 8,9,10
]);

newTree.insert(11)
newTree.insert(12)
prettyPrint(newTree.tree);

// newTree.inorder(testCallback)
// console.log(newTree.returnArr());

// console.log(newTree.levelOrder());
// newTree.levelOrder(testCallback)

// console.log(newTree.height())
// console.log(newTree.depth())


newTree.rebalance()

prettyPrint(newTree.tree);

// console.log(newTree.levelOrder(newTree.isTreeBalanced))

// console.log(newTree.treeBalanced())

function testCallback(val) {
  console.log(`I am number ${val}`);
}

function testArrCallback (arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].value)
  }
}
