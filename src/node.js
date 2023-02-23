export const Node = function (value = null, leftChild = null, rightChild = null) {
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
  