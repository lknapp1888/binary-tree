(()=>{"use strict";const e=function(e=null,l=null,t=null){this.value=e,this.leftChild=l,this.rightChild=t,this.changeVal=e=>{this.value=e}};e.prototype.updateRightChild=function(e){this.rightChild=e},e.prototype.updateLeftChild=function(e){this.leftChild=e},e.prototype.changeVal=function(e){this.value=e};const l=function(e){if(0!==e.length){if(1===e.length)return e;{const i=l(e.slice(0,Math.floor(e.length/2))),h=l(e.slice(Math.floor(e.length/2),e.length));return t(l(i),l(h))}}},t=function(e,l){let t=[],i=e.length+l.length;for(let h=0;h<i&&(e[0]||l[0]);h++)e[0]<l[0]?t.push(e.shift()):e[0]>l[0]?t.push(l.shift()):e[0]||void 0===l[0]?l[0]||void 0===e[0]?e[0]===l[0]&&t.push(e.shift()):t.push(e.shift()):t.push(l.shift());return t},i=(e,l="",t=!0)=>{null!==e.rightChild&&i(e.rightChild,`${l}${t?"│   ":"    "}`,!1),console.log(`${l}${t?"└── ":"┌── "}${e.value}`),null!==e.leftChild&&i(e.leftChild,`${l}${t?"    ":"│   "}`,!0)},h=function(e,l){return e>l?e:l},n={isNodeBalanced:function(e){const l=this.height(e.leftChild),t=this.height(e.rightChild);return!(l-t<-1||l-t>1)},height:function(e){if(null===e)return 0;const l=this.height(e.leftChild),t=this.height(e.rightChild);return h(l,t)+1}},r=function(e){this.tree=o(l(e)),this.queue=[],this.insert=function(e){if(!this.tree.value)return this.tree.value=e;let l=this.tree,t=this.tree;for(;null!==t;){if(e===t.value)return alert("duplicate numbers not allowed");e<t.value?(l=t,t=t.leftChild):(l=t,t=t.rightChild)}l.value<e?l.updateRightChild(o([e])):l.updateLeftChild(o([e]))},this.deleteNode=function(e){let l=this.tree,t=this.tree;for(;null!==t&&e!==t.value;)e<t.value?(l=t,t=t.leftChild):(l=t,t=t.rightChild);return null===t?alert("number does not exist in the tree"):null!==t.leftChild&&null!==t.rightChild?(t.value=this.findSmallestVal(t.rightChild).value,void this.deleteSmallestNode(t,t.rightChild)):null===t.leftChild&&null===t.rightChild?l.leftChild&&l.leftChild.value===e?l.leftChild=null:l.rightChild=null:null===t.leftChild&&null!==t.rightChild?l.leftChild===t?l.leftChild=t.rightChild:l.rightChild=t.rightChild:void 0},this.findSmallestVal=function(e){let l=e;for(;null!==l.leftChild;)l=l.leftChild;return l},this.deleteSmallestNode=function(e,l){let t=e,i=l;if(null===i.leftChild&&t.rightChild===i)return t.rightChild=i.rightChild;if(null===i.leftChild&&t.leftChild===i)return t.leftChild=i.rightChild;for(;null!==i.leftChild;)t=i,i=i.leftChild;console.log(t.leftChild),console.log(i.rightChild),t.leftChild=i.rightChild},this.find=function(e){let l=this.tree;if(e===l.value)return l;for(;null!==l;)if(e<l.value)l=l.leftChild;else if(e>l.value)l=l.rightChild;else if(e===l.value)return l;return null===l?"number is not in tree":l},this.levelOrder=function(e=null,l=this.tree){let t=[l],i=[l.value],h=[l];for(;t.length>0;)null!==t[0].leftChild&&(i.push(t[0].leftChild.value),h.push(t[0].leftChild),t.push(t[0].leftChild)),null!==t[0].rightChild&&(i.push(t[0].rightChild.value),h.push(t[0].rightChild),t.push(t[0].rightChild)),t.shift();return null===e?i:e(h)},this.preorder=function(e=null,l=this.tree){let t=[];const i=function(e,l){null!==e&&(l?l(e):t.push(e.value),i(e.leftChild,l),i(e.rightChild,l))};if(i(l,e),!e)return t},this.postorder=function(e=null,l=this.tree){let t=[];const i=function(e,l){null!==e&&(i(e.leftChild,l),i(e.rightChild,l),l?l(e):t.push(e.value))};if(i(l,e),!e)return t},this.inorder=function(e=null,l=this.tree){let t=[];const i=function(e,l){null!==e&&(i(e.leftChild,l),l?l(e):t.push(e.value),i(e.rightChild,l))};if(i(l,e),!e)return t},this.height=function(e=this.tree){if(null===e)return 0;const l=this.height(e.leftChild),t=this.height(e.rightChild);return h(l,t)+1},this.depth=function(e=this.tree,l=this.tree){let t=0,i=l;const h=e.value;for(;null!==i&&i.value!==h;)h>i.value&&(i=i.rightChild),h<i.value&&(i=i.leftChild),t++;return t},this.isTreeArrBalanced=function(e){for(let l=0;l<e.length;l++)if(!1===n.isNodeBalanced(e[l]))return!1;return!0},this.isTreeBalanced=function(){return this.levelOrder(this.isTreeArrBalanced)},this.rebalance=function(){if(this.isTreeBalanced){const e=this.inorder();this.tree=o(e)}else console.log("tree balanced")}},o=function(t=l(t)){let i=[...new Set(t)];if(0===i.length)return null;const h=(i.length-1+0)/2,n=i[Math.floor(h)];return new e(n,o(i.slice(0,h)),o(i.slice(h+1,i.length)))};!function(){const e=function(e,l,t){let i=[];for(let e=0;e<30;e++){let e=Math.floor(30*Math.random());e+=0,i.push(e)}return i}(),l=new r(e);i(l.tree),console.log(`Is the tree balanced? ${l.isTreeBalanced()}`),console.log(`Level order: ${l.levelOrder()}`),console.log(`preorder: ${l.preorder()}`),console.log(`postorder: ${l.postorder()}`),console.log(`innorder: ${l.inorder()}`),console.log("add several > 100 numbers to inbalance tree"),l.insert(101),l.insert(102),l.insert(103),l.insert(104),l.insert(105),console.log(`Is the tree balanced? ${l.isTreeBalanced()}`),console.log("call the rebalance function"),l.rebalance(),console.log(`Is the tree balanced? ${l.isTreeBalanced()}`),console.log(`Level order: ${l.levelOrder()}`),console.log(`preorder: ${l.preorder()}`),console.log(`postorder: ${l.postorder()}`),console.log(`innorder: ${l.inorder()}`)}()})();