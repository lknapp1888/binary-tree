const Node = function (value = null, leftChild = null, rightChild = null) {
  this.value = value;
  this.leftChild = leftChild;
  this.rightChild = rightChild;
  this.changeVal = (val) => {
    this.value = val;
  };
};

Node.prototype.updateRightChild = function (val) {
  this.rightChild = val;
};
Node.prototype.updateLeftChild = function (val) {
  this.leftChild = val;
};
Node.prototype.changeVal = function (val) {
  this.value = val;
};

const Tree = function (arr) {
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
    if (val === node.value) {return node}
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
    if (node === null ){return 'number is not in tree'}
    return node;
  }

  this.returnArr = function (node = this.tree, arr = [node.value]) {
    if (node === null) return arr;
    else {
      if (node.rightChild === null) {
        return this.returnArr(node.rightChild, [...arr])
      }
      if (node.leftChild === null) {
        return this.returnArr(node.leftChild, [...arr, node.rightChild.value])
      }
      return mergeSort(arrMerge(this.returnArr(node.leftChild, [...arr, node.leftChild.value, node.rightChild.value]), this.returnArr(node.rightChild, [])))
    }
  }

  this.levelOrder = function (cb) {
    const arr = this.returnArr();
    arr.map(e => { cb(e)
    });
  }
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

const mergeSort = function (arr) {
  if (arr.length === 0) return;
  if (arr.length === 1) return arr;
  else {
    const left = mergeSort(arr.slice(0, Math.floor(arr.length / 2)));
    const right = mergeSort(arr.slice(Math.floor(arr.length / 2), arr.length));
    return arrMerge(mergeSort(left), mergeSort(right));
  }
};

const arrMerge = function (arrOne, arrTwo) {
  let arr = [];
  let mergeLen = arrOne.length + arrTwo.length;
  for (i = 0; i < mergeLen; i++) {
    if (!arrOne[0] && !arrTwo[0]) break;
    if (arrOne[0] < arrTwo[0]) {
      arr.push(arrOne.shift());
      continue;
    }
    if (arrOne[0] > arrTwo[0]) {
      arr.push(arrTwo.shift());
      continue;
    }
    if (!arrOne[0] && arrTwo[0] !== undefined) {
      arr.push(arrTwo.shift());
      continue;
    }
    if (!arrTwo[0] && arrOne[0] !== undefined) {
      arr.push(arrOne.shift());
      continue;
    }
    if (arrOne[0] === arrTwo[0]) {
      arr.push(arrOne.shift());
    }
  }
  return arr;
};


const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};


/** tests **/

const newTree = new Tree([
  1, 2, 12, 13, 14, 15, 16, 3, 4, 5, 6, 7, 8, 9, 10, 11, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27,
]);
// prettyPrint(newTree.tree);
// newTree.deleteNode(8);
prettyPrint(newTree.tree);

console.log(newTree.returnArr())

newTree.levelOrder(testCallback)

function testCallback (val) {
  console.log(`I am number ${val}`)
} 
