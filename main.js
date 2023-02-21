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
  }
  Node.prototype.updateRightChild = function (val) {
    this.rightChild = val;
  }
  Node.prototype.changeVal = function (val) {
    this.value = val;
  }

  const Tree = function (arr) {
    this.tree = buildTree(arr);

    this.insert = function (num) {
      if (!this.tree.value) {return this.tree.value = num}
      let prev = this.tree;
      let node = this.tree;
      while (node !== null) {
        if (num === node.value) {
          return alert('duplicate numbers not allowed')
        }
        if (num < node.value) {
          prev = node;
          node = node.leftChild;
        }
        else {
          prev = node;
          node = node.rightChild;
        }
      }
      console.log(prev)
      console.log(node)
       if (prev.value < num) {
        prev.updateRightChild(buildTree([num]));
       }
       else {
        prev.updateLeftChild(buildTree([num]));
       }
       prettyPrint(this.tree)
     }
  };

  const buildTree = function (arr) {
    // sort
    //remove duplicates
    if (arr.length === 0) return null;
    const end = arr.length - 1;
    const mid = (0+end)/2;
    const root = arr[Math.floor(mid)]
    const newNode = new Node(root, buildTree(arr.slice(0, mid)), buildTree(arr.slice(mid + 1, arr.length)));
    return newNode;
  }

  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }


const newTree = new Tree([1,3,4,5,6,7, 8,9,10,11,13,14,15,16,17,18,19,20])
prettyPrint(newTree.tree)
newTree.insert(12)