import { Tree } from "./tree";
import { prettyPrint } from "./utility";




/** tests **/

const newTree = new Tree([
  1, 2, 12, 13, 14, 15, 16, 3, 4, 5, 6, 7, 8
]);

prettyPrint(newTree.tree);

newTree.preorder(testCallback)
// console.log(newTree.returnArr());

// newTree.levelOrder(testCallback);

function testCallback(val) {
  console.log(`I am number ${val.value}`);
}
