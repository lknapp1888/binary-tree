(()=>{"use strict";const l=function(l=null,t=null,e=null){this.value=l,this.leftChild=t,this.rightChild=e,this.changeVal=l=>{this.value=l}};l.prototype.updateRightChild=function(l){this.rightChild=l},l.prototype.updateLeftChild=function(l){this.leftChild=l},l.prototype.changeVal=function(l){this.value=l};const t=function(l){if(0!==l.length){if(1===l.length)return l;{const i=t(l.slice(0,Math.floor(l.length/2))),h=t(l.slice(Math.floor(l.length/2),l.length));return e(t(i),t(h))}}},e=function(l,t){let e=[],i=l.length+t.length;for(let h=0;h<i&&(l[0]||t[0]);h++)l[0]<t[0]?e.push(l.shift()):l[0]>t[0]?e.push(t.shift()):l[0]||void 0===t[0]?t[0]||void 0===l[0]?l[0]===t[0]&&e.push(l.shift()):e.push(l.shift()):e.push(t.shift());return e},i=(l,t="",e=!0)=>{null!==l.rightChild&&i(l.rightChild,`${t}${e?"│   ":"    "}`,!1),console.log(`${t}${e?"└── ":"┌── "}${l.value}`),null!==l.leftChild&&i(l.leftChild,`${t}${e?"    ":"│   "}`,!0)},h=function(l,t){return l>t?l:t},n={isNodeBalanced:function(l){const t=this.height(l.leftChild),e=this.height(l.rightChild);return!(t-e<-1||t-e>1)},height:function(l){if(null===l)return 0;const t=this.height(l.leftChild),e=this.height(l.rightChild);return h(t,e)+1}},r=function(e=t(e)){if(0===e.length)return null;const i=(e.length-1+0)/2,h=e[Math.floor(i)];return new l(h,r(e.slice(0,i)),r(e.slice(i+1,e.length)))},u=new function(l){this.tree=r(t([1,2,3,4,5,6,7,8,9,10])),this.queue=[],this.insert=function(l){if(!this.tree.value)return this.tree.value=l;let t=this.tree,e=this.tree;for(;null!==e;){if(l===e.value)return alert("duplicate numbers not allowed");l<e.value?(t=e,e=e.leftChild):(t=e,e=e.rightChild)}t.value<l?t.updateRightChild(r([l])):t.updateLeftChild(r([l]))},this.deleteNode=function(l){let t=this.tree,e=this.tree;for(;null!==e&&l!==e.value;)l<e.value?(t=e,e=e.leftChild):(t=e,e=e.rightChild);return null===e?alert("number does not exist in the tree"):null!==e.leftChild&&null!==e.rightChild?(e.value=this.findSmallestVal(e.rightChild).value,void this.deleteSmallestNode(e,e.rightChild)):null===e.leftChild&&null===e.rightChild?t.leftChild&&t.leftChild.value===l?t.leftChild=null:t.rightChild=null:null===e.leftChild&&null!==e.rightChild?t.leftChild===e?t.leftChild=e.rightChild:t.rightChild=e.rightChild:void 0},this.findSmallestVal=function(l){let t=l;for(;null!==t.leftChild;)t=t.leftChild;return t},this.deleteSmallestNode=function(l,t){let e=l,i=t;if(null===i.leftChild&&e.rightChild===i)return e.rightChild=i.rightChild;if(null===i.leftChild&&e.leftChild===i)return e.leftChild=i.rightChild;for(;null!==i.leftChild;)e=i,i=i.leftChild;console.log(e.leftChild),console.log(i.rightChild),e.leftChild=i.rightChild},this.find=function(l){let t=this.tree;if(l===t.value)return t;for(;null!==t;)if(l<t.value)t=t.leftChild;else if(l>t.value)t=t.rightChild;else if(l===t.value)return t;return null===t?"number is not in tree":t},this.levelOrder=function(l=null,t=this.tree){let e=[t],i=[t.value],h=[t];for(;e.length>0;)null!==e[0].leftChild&&(i.push(e[0].leftChild.value),h.push(e[0].leftChild),e.push(e[0].leftChild)),null!==e[0].rightChild&&(i.push(e[0].rightChild.value),h.push(e[0].rightChild),e.push(e[0].rightChild)),e.shift();return null===l?i:l(h)},this.preorder=function(l=null,t=this.tree){let e=[];const i=function(l,t){null!==l&&(t?t(l):e.push(l.value),i(l.leftChild,t),i(l.rightChild,t))};if(i(t,l),!l)return e},this.postorder=function(l=null,t=this.tree){let e=[];const i=function(l,t){null!==l&&(i(l.leftChild,t),i(l.rightChild,t),t?t(l):e.push(l.value))};if(i(t,l),!l)return e},this.inorder=function(l=null,t=this.tree){let e=[];const i=function(l,t){null!==l&&(i(l.leftChild,t),t?t(l):e.push(l.value),i(l.rightChild,t))};if(i(t,l),!l)return e},this.height=function(l=this.tree){if(null===l)return 0;const t=this.height(l.leftChild),e=this.height(l.rightChild);return h(t,e)+1},this.depth=function(l=this.tree,t=this.tree){let e=0,i=t;const h=l.value;for(;null!==i&&i.value!==h;)h>i.value&&(i=i.rightChild),h<i.value&&(i=i.leftChild),e++;return e},this.isTreeArrBalanced=function(l){for(let t=0;t<l.length;t++)if(!1===n.isNodeBalanced(l[t]))return!1;return!0},this.isTreeBalanced=function(){return this.levelOrder(this.isTreeArrBalanced)}}([1,2,3,4,5,6,7,8,9,10]);u.insert(11),u.insert(12),i(u.tree),console.log(u.isTreeBalanced())})();