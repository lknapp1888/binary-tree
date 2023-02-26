import { Node } from "./node";
import { mergeSort, prettyPrint, arrMerge, maximum, treeFunc } from "./utility";


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
    let valStack = [node.value];
    let nodeStack = [node]
    while (arr.length > 0) {
        if (arr[0].leftChild !== null) {
          valStack.push(arr[0].leftChild.value)
          nodeStack.push(arr[0].leftChild);
          arr.push(arr[0].leftChild)
        }
        if (arr[0].rightChild !== null) {
          valStack.push(arr[0].rightChild.value)
          nodeStack.push(arr[0].rightChild);
          arr.push(arr[0].rightChild)
        }
        arr.shift()
      }
      if (cb === null) {
        return valStack;
      }
       return cb(nodeStack)
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

  this.height = function (node = this.tree) {
    if (node === null) return 0;
    const leftHeight = this.height(node.leftChild)
    const rightHeight = this.height(node.rightChild)
    return maximum(leftHeight, rightHeight) + 1;
  };

  this.depth = function (node = this.tree, root = this.tree) {
    let depth = 0
    let curr = root;
    const searchVal = node.value;
    while (curr !== null) {
      if (curr.value === searchVal) {break}
      if (searchVal > curr.value) {curr = curr.rightChild}
      if (searchVal < curr.value) {curr = curr.leftChild}
      depth++
    }
    return depth;
};

this.isTreeArrBalanced = function (arr) {
  //must be an array of tree nodes
  for (let i = 0; i < arr.length; i++) {
    if (treeFunc.isNodeBalanced(arr[i]) === false) {
      return false;
  }
}
return true;
}

this.isTreeBalanced = function () {
  return this.levelOrder(this.isTreeArrBalanced);
}

this.rebalance = function () {
  if (this.isTreeBalanced) {
    const treeArr = this.inorder()
    this.tree = buildTree(treeArr)
  }
  else {
    console.log('tree balanced')
  }
}
}


const buildTree = function (arr = mergeSort(arr)) {
    let array = [...new Set(arr)]
    if (array.length === 0) return null;
    const end = array.length - 1;
    const mid = (0 + end) / 2;
    const root = array[Math.floor(mid)];
    const newNode = new Node(
      root,
      buildTree(array.slice(0, mid)),
      buildTree(array.slice(mid + 1, array.length))
    );
    return newNode;
  }
