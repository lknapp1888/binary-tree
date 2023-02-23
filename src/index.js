import { Tree } from "./tree";
import { prettyPrint } from "./utility";




/** tests **/

const newTree = new Tree([
  1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12
]);

prettyPrint(newTree.tree);

// newTree.inorder(testCallback)
// console.log(newTree.returnArr());

console.log(newTree.levelOrder());
newTree.levelOrder(testCallback)

function testCallback(val) {
  console.log(`I am number ${val}`);
}
