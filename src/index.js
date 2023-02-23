import { Tree } from "./tree";
import { prettyPrint } from "./utility";




/** tests **/

const newTree = new Tree([
  1, 2, 12, 13, 14, 15, 16, 3, 4, 5, 6, 7, 8, 9, 10, 11, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27,
]);

prettyPrint(newTree.tree);

// console.log(newTree.returnArr());

// newTree.levelOrder(testCallback);

// function testCallback(val) {
//   console.log(`I am number ${val}`);
// }
