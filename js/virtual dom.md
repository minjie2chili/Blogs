Virtual DOM 算法主要是实现上面步骤的三个函数：element，diff，patch。
然后就可以实际的进行使用：

diff介绍：https://zhuanlan.zhihu.com/p/103187276
https://zh-hans.reactjs.org/docs/reconciliation.html

diff实现 https://zhuanlan.zhihu.com/p/63964441


```js
function Element(tagName, props, children) {
  this.tagName = tagName;
  this.props = props;
  this.children = children;
}

Element.prototype.render = function () {
  var dom = document.createElement(this.tagName);
  var props = dom.props;
  for (var propName in props) {
    dom.setAttribute(propName, props[propName]);
  }
  var children = this.children || [];
  children.forEach(function (child) {
    var ele =
      child instanceof Element
        ? child.render()
        : document.createTextNode(child);
    dom.appendChild(ele);
  });
};

var el = Element;
var ul = el("ul", { id: "list" }, [
  el("ul", { id: "list" }, ["item1"]),
  el("ul", { id: "list" }, ["item2"]),
  el("ul", { id: "list" }, ["item3"]),
]);

var ulRoot = ul.render();
document.body.appendChild(ulRoot);

// -------------
var REPLACE = 0;
var REORDER = 1;
var PROPS = 2;
var TEXT = 3;

patches[0] = [
  {
    type: REPALCE,
    node: newNode, // el('section', props, children)
  },
  {
    type: PROPS,
    props: {
      id: "container",
    },
  },
];

function patch(node, patches) {
  var walker = { index: 0 };
  dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches) {
  var currentPatches = patches[walker.index]; // 从patches拿出当前节点的差异

  var len = node.childNodes ? node.childNodes.length : 0;
  for (var i = 0; i < len; i++) {
    // 深度遍历子节点
    var child = node.childNodes[i];
    walker.index++;
    dfsWalk(child, walker, patches);
  }

  if (currentPatches) {
    applyPatches(node, currentPatches); // 对当前节点进行DOM操作
  }
}

function applyPatches(node, currentPatches) {
  currentPatches.forEach(function (currentPatch) {
    switch (currentPatch.type) {
      case REPLACE:
        node.parentNode.replaceChild(currentPatch.node.render(), node);
        break;
      case REORDER:
        reorderChildren(node, currentPatch.moves);
        break;
      case PROPS:
        setProps(node, currentPatch.props);
        break;
      case TEXT:
        node.textContent = currentPatch.content;
        break;
      default:
        throw new Error("Unknown patch type " + currentPatch.type);
    }
  });
}
```