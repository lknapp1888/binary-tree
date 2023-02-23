import { Node } from "./node";
import { mergeSort, prettyPrint, arrMerge } from "./utility";


export const Tree = function (arr) {
  this.tree = buildTree(mergeSort(arr));
  this.queue = [];

  this.insert = function (num) {
    if (!this.tree.value) {
      return (this.tree.value = num);
    }
    let prev = this.tree;
    let node = this.tree;
    while (node !== null) {
      if (num === node.value) {
        return alert("duplicate numbers not allowed");
      }
      if (num < node.value) {
        prev = node;
        node = node.leftChild;
      } else {
        prev = node;
        node = node.rightChild;
      }
    }
    if (prev.value < num) {
      prev.updateRightChild(buildTree([num]));
    } else {
      prev.updateLeftChild(buildTree([num]));
    }
  };

  this.deleteNode = function (num) {
    let prev = this.tree;
    let node = this.tree;
    while (node !== null) {
      if (num === node.value) {
        break;
      }
      if (num < node.value) {
        prev = node;
        node = node.leftChild;
      } else {
        prev = node;
        node = node.rightChild;
      }
    }
    if (node === null) {
      return alert("number does not exist in the tree");
    }
    if (node.leftChild !== null && node.rightChild !== null) {
      node.value = this.findSmallestVal(node.rightChild).value;
      this.deleteSmallestNode(node, node.rightChild);
      return;
    }
    if (node.leftChild === null && node.rightChild === null) {
      if (prev.leftChild && prev.leftChild.value === num) {
        return (prev.leftChild = null);
      }
      return (prev.rightChild = null);
    }
    if (node.leftChild === null && node.rightChild !== null) {
      if (prev.leftChild === node) {
        return (prev.leftChild = node.rightChild);
      }
      return (prev.rightChild = node.rightChild);
    }
  };

  this.findSmallestVal = function (node) {
    let curr = node;
    while (curr.leftChild !== null) {
      curr = curr.leftChild;
    }
    return curr;
  };

  this.deleteSmallestNode = function (previous, node) {
    let prev = previous;
    let curr = node;
    /* if curr.left is null already, then curr is the smallest. check if curr was right or left child
      of prev, then replace curr with its right child (this will either be null or higher val)
      */
    if (curr.leftChild === null && prev.rightChild === curr) {
      return (prev.rightChild = curr.rightChild);
    }
    if (curr.leftChild === null && prev.leftChild === curr) {
      return (prev.leftChild = curr.rightChild);
    }
    while (curr.leftChild !== null) {
      prev = curr;
      curr = curr.leftChild;
    }
    console.log(prev.leftChild);
    console.log(curr.rightChild);
    prev.leftChild = curr.rightChild;
  };

  this.find = function (val) {
    let node = this.tree;
    if (val === node.value) {
      return node;
    }
    while (node !== null) {
      if (val < node.value) {
        node = node.leftChild;
        continue;
      }
      if (val > node.value) {
        node = node.rightChild;
        continue;
      }
      if (val === node.value) {
        return node;
      }
    }
    if (node === null) {
      return "number is not in tree";
    }
    return node;
  };

  this.levelOrder = function (cb = null, node = this.tree) {
    let arr = [node];
    let stack = [node.value];
    while (arr.length > 0) {
        if (arr[0].leftChild !== null) {
          stack.push(arr[0].leftChild.value)
          arr.push(arr[0].leftChild)
        }
        if (arr[0].rightChild !== null) {
          stack.push(arr[0].rightChild.value)
          arr.push(arr[0].rightChild)
        }
        arr.shift()
      }
      if (cb === null) {
        return stack;
      }
      stack.map((e) => {cb(e)});
    };

  this.preorder = function (cb = null, node = this.tree) {
    let array = []
    const preorderRecursive = function (node, cb) {
      if (node === null) {return};
      if (!cb) {
        array.push(node.value)
      }
      else {
        cb(node)
      }
      preorderRecursive(node.leftChild, cb)
      preorderRecursive(node.rightChild, cb)
    }
    preorderRecursive(node, cb)
    if (!cb) {
      return array;
    }
  };

  this.postorder = function (cb = null, node = this.tree) {
    let array = []
    const postorderRecursive = function (node, cb) {
      if (node === null) {return};
      postorderRecursive(node.leftChild, cb)
      postorderRecursive(node.rightChild, cb)
      if (!cb) {
        array.push(node.value)
      }
      else {
        cb(node)
      }
    }
    postorderRecursive(node, cb)
    if (!cb) {
      return array;
    }
  };

  this.inorder = function (cb = null, node = this.tree) {
    let array = []
    const inorderRecursive = function (node, cb) {
      if (node === null) {return};
      inorderRecursive(node.leftChild, cb)
      if (!cb) {
        array.push(node.value)
      }
      else {
        cb(node)
      }
      inorderRecursive(node.rightChild, cb)
    }
    inorderRecursive(node, cb)
    if (!cb) {
      return array;
    }
  };
};

const buildTree = function (arr = mergeSort(arr)) {
    //remove duplicates
    if (arr.length === 0) return null;
    const end = arr.length - 1;
    const mid = (0 + end) / 2;
    const root = arr[Math.floor(mid)];
    const newNode = new Node(
      root,
      buildTree(arr.slice(0, mid)),
      buildTree(arr.slice(mid + 1, arr.length))
    );
    return newNode;
  };
