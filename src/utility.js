export const mergeSort = function (arr) {
    if (arr.length === 0) return;
    if (arr.length === 1) return arr;
    else {
      const left = mergeSort(arr.slice(0, Math.floor(arr.length / 2)));
      const right = mergeSort(arr.slice(Math.floor(arr.length / 2), arr.length));
      return arrMerge(mergeSort(left), mergeSort(right));
    }
  };
  
  export const arrMerge = function (arrOne, arrTwo) {
    let arr = [];
    let mergeLen = arrOne.length + arrTwo.length;
    for (let i = 0; i < mergeLen; i++) {
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
  
  export const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  export const maximum = function(one, two) {
    if (one > two) {
      return one;
    }
    return two;
  };

  export const randomNumArr = function(length, min, max) {
    let arr = [];
    for (let i = 0; i < length; i++) {
      let num = Math.floor(Math.random() * (max - min));
      num += min;
      arr.push(num)
    }
    return arr;
  }

  export const treeFunc = {
    //'utility' tree functions to avoid scoping issues with 'this'
    isNodeBalanced: function (node) {
      const leftHeight = this.height(node.leftChild);
      const rightHeight = this.height(node.rightChild);
      if (((leftHeight - rightHeight) < -1) || ((leftHeight - rightHeight) > 1)) {
        return false;
      }
      else {
        return true;
      }
    },
  
    height: function (node) {
      if (node === null) return 0;
      const leftHeight = this.height(node.leftChild)
      const rightHeight = this.height(node.rightChild)
      return maximum(leftHeight, rightHeight) + 1;
    },
  }