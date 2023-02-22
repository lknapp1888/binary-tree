const Node = function (value = null, leftChild = null, rightChild = null) {
  this.value = value;
  this.leftChild = leftChild;
  this.rightChild = rightChild;
  this.changeVal = (val) => {
    this.value = val;
  };
};

Node.prototype.updateLeftChild = function (val) {
  this.leftChild = val;
};
Node.prototype.updateRightChild = function (val) {
  this.rightChild = val;
};
Node.prototype.changeVal = function (val) {
  this.value = val;
};

const Tree = function (arr) {
  this.tree = buildTree(arr);

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
};

const buildTree = function (arr) {
  // sort
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

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const newTree = new Tree([
  1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27,
]);
prettyPrint(newTree.tree);
newTree.deleteNode(8);
prettyPrint(newTree.tree);
