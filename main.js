const Node = function (value = null, leftChild = null, rightChild = null) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.changeVal = (val) => {
      this.value = val;
    };
  };

  const Tree = function (arr) {

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

// prettyPrint(buildTree([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]))
// console.log(buildTree([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]))
prettyPrint(buildTree([1,2,3,4,5,6,7]))