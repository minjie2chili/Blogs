#### 由class中的继承 思考constructor中为什么要写super

```
class A{
	
}
class B extends A{
// 	constructor(){
// 		console.log(this)
//     }
}
// new B();
```
用babel编译为
```
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}
var A = function A() {
  _classCallCheck(this, A);
};

var B =
  /*#__PURE__*/
  (function(_A) {
    _inherits(B, _A); // 实现继承

    function B() {
      _classCallCheck(this, B);

      return _possibleConstructorReturn(
        this,
        _getPrototypeOf(B).apply(this, arguments)
      );
    }

    return B;
  })(A);
```

在_inherits中做了两步操作
1. Object.create(proto, [propertiesObject])
将subClass的prototype的proto指向了superClass的prototype，让子类的实例能够继承父类的方法，同时通过第二个参数将constructor指向了自己

2. 通过setPrototype捆绑subClass的__proto__，让子类能继承父类的静态方法

事实上class的本质是function，通过以上两种操作，以下等式成立
subClass.prototype.__proto__ === subClass.__proto__.prototype

一个函数定义之后，它本身只是一个函数，没有任何附加东西，它的prototype上有constructor和一些方法，访问属性实际上都是从prototype中获取，没有找到的话会根据原型链从__proto__里面获取。
所以subClass和subClass.prototype是一伙的，subClass.prototype.__proto__指向了它的Object.create指明的superClass.prototype，
因而subClass.__proto__.prototype也指向了superClass.prototype

在constructor中调用super实际上相当于Object.getPrototypeOf(子类).call(子类this,...params)