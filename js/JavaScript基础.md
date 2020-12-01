### JavaScript基础

#### 1. async 和 defer的相同点和区别
defer 延迟加载
async 异步加载
defer和async在“下载”这块是一样的，都是异步不会阻塞html的解析
区别在于何时执行，async不管声明顺序如何，加载完了后会立刻执行
defer将在页面完成解析时(domcontentloaded)执行，同时是按照加载顺序执行的

w3school的说法：
>如果 async="async"：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
>如果不使用 async 且 defer="defer"：脚本将在页面完成解析时执行
>如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本

我特意试了一下
```html
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Untitled Document</title>
<script src="./a.js"></script>
<script src="./a1.js" async></script>
<script src="./a2.js" defer></script>
<script src="./a3.js" ></script>

</head>

<body>
</body>
</html>
```
打印的结果是a、a1、a3、a2 意味着defer会滞后执行
![https://segmentfault.com/q/1010000000640869](https://image-static.segmentfault.com/28/4a/284aec5bb7f16b3ef4e7482110c5ddbb_articlex)[]

#### 2. 关于服务端渲染
服务端渲染和普通的后端渲染的区别是：服务端渲染通过一个中间node层，直接返回一串html让浏览器解析；后端渲染是返回html，但是数据和资源还是得从服务器获取
总的来说减少了客户端和服务器来回的通信时间。

#### 3. requestAnimationFrame可以更快更准确的渲染
接收一个函数，requestAnimationFrame(Fn)，比setInterval和setTimeout好

#### 4. 如何自定义事件 (不考虑ie9之前版本)
- (1) 使用new Event 无法获取event.detail
```javascript
let btn = document.querySelector("#btn");
let event = new Event("someNewEvent",{
    name:"mj"
})
btn.addEventListener("someNewEvent",function(event){
    console.log("event",event)
})
btn.dispatchEvent(event) // 触发事件
```
- (2) 使用createEvent("customEvent") 属于dom3
> event.initEvent(eventType,canBubble,cancelable) 已废弃
该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。
```javascript
let btn = document.getElementById("app");
let ev = document.createEvent("CustomEvent");
ev.initEvent("someNewEvent",true,true);
btn.addEventListener("someNewEvent",function(event){
    console.log("createEvent",event)
})
btn.dispatchEvent(ev);
```
- (3) 使用 new CustomEvent
```javascript
let btn = document.getElementById("app");
let ev = new CustomEvent("someNewEvent1",{
    bubble:true,
    cancleable:true,
    detail:"我是传递的参数"
})
btn.addEventListener("someNewEvent1",function(event){
    console.log("CustomEvent",event)
})
btn.dispatchEvent(ev);
```

- (3) 使用 观察者模式(发布订阅)
```javascript
function eventHandler(){
    this.handler = {}
}
eventHandler.prototype = {
    constructor:eventHandler,
    add:function(type,handler){
        if(typeof this.handler[type]==="undefined"){
            this.handler[type] = []
        }
        this.handler[type].push(handler)
    },
    remove:function(type,handler){
        if(this.handler[type] instanceof Array){
            let arr = this.handler[type];
            for(let i = 0;i<arr.length;i++){
                if(arr[i] === handler){
                    arr.splice(i,1);
                    break;
                }
            }
        }
    },
    fire:function(event){
        if(this.handler[type] instanceof Array){
            let arr = this.handler[type];
            arr.forEach(handler=>handler(event))
        }
    }
}
```

#### 5. == 和 === 的区别
===只有类型相同且值相同时，返回true
== 如果两者类型相同，比较值
如果两者类型不同，首先需要类型转换：
- 如果比较的是null和undefined，返回true
- 判断两者类型是否为string何number，如果是，将字符串转化为number
- 判断一方是否为boolean，如果是，将boolean转化为number再判断
- 判断一方是否为object且另一方为string、number或者symbol，如果是，将object转为原始类型再进行判断

#### 6. 设置nginx代理
正向代理：代理的是客户端，如通过vpn上youtube，是通过vpn将国内ip转为一个对应的国外ip，即可访问
反向代理：客户端请求代理服务器，代理服务器向具体服务器请求，nginx作为服务器的一个代理人

反向代理设置：
```
server {
    listen       80;
    server_name  www.123.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        index  index.html index.htm index.jsp;
    }
}
```
当访问 www.123.com 时相当于访问 http://127.0.0.1:8080/index.html


#### 7. Object.is
Object.is类似于===，但有一些细微差别，如
Object.is(NaN,NaN)  // true
NaN===NaN // false

Object.is(+0,-0)  // false
+0===-0  // true

#### 8. BFC相关知识点
- bfc内，盒子垂直排列；
- 同一个bfc的两个元素的margin会发生垂直合并，使用bfc可保证margin都生效，因为bfc是页面上的一个独立容器，容器子元素不影响外面的元素
- 计算bfc高度，浮动元素也算在内
- bfc的区域不会与float box重叠，所以一个兄弟元素为float时，防止两者重叠，可把一个元素设置bfc


##### 创建bfc
根元素
浮动元素，float不为none
position为absolute或fixed
overflow不为visible的元素
display为inline-block，table-cell，table-caption


#### 9. commonJS、es6模块和AMD、CMD规范
**AMD 和 CMD 规范的区别？ 它们之间的主要区别有两个方面。**
（1）第一个方面是在模块定义时对依赖的处理不同。AMD 推崇依赖前置，在 定义模块的时候就要声明其依赖的模块。而 CMD 推崇 就近依赖，只有在用到 某个模块的时候再去 require。

（2）第二个方面是对依赖模块的执行时机处理不同。首先 AMD 和 CMD 对于 模块的加载方式都是异步加载，不过它们的区别在于 模块的执行时机，AMD 在 依赖模块加载完成后就直接执行依赖模块，依赖模块的执行顺序和我们书写的顺 序不一定一致。而 CMD 在依赖模块加载完成后并不执行，只是下载而已，等 到所有的依赖模块都加载好后，进入回调函数逻辑，遇到 require 语句 的时候 才执行对应的模块，这样模块的执行顺序就和我们书写的顺序保持一致了。 
AMD非同步加载，可指定回调函数
```javascript
// CMD
define(function(require, exports, module) { 
    var a = require("./a"); 
    a.doSomething(); // 此处略去 100 行 
    var b = require("./b"); // 依赖可以就近书写 
    b.doSomething(); 
    // ...
}); 
// AMD 默认推荐 
define(["./a", "./b"], function(a, b) { // 依赖必须一开始就写好 
    a.doSomething(); // 此处略去 100 行 
    b.doSomething(); // ...
});
```

**ES6 模块与 CommonJS 模块 的差异。**
commonJS:每个模块提供了一个exports变量，默认exports = module.exports
所以可以使用exports.add = function(){};exports.minus = function(){}
但是不要切断两者的引用，如将exports直接指向一个对象，exports=xxx 
commonJS 使用require和module.exports

es6实现了import和export，实际上也是经过babel翻译成require和module.exports,所以编译还不够，还需要借助webpack这种工具打包
nodejs会把commonJS规范下代码全变成函数字符串，然后通过vm解析
浏览器中实现require和module对象，同时也是变成字符串让浏览器执行

1.CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。 CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块 内部的变化就影响不到这个值。ES6 模块的运行机制与 CommonJS 不一 样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生 成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载 的那个模块里面去取值。 
2.CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。 CommonJS 模块就是对象，即在输入时是先加载整个模块，生成一个对 象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就 会生成。

#### 10. node的一些知识
- process.cwd():nodejs 进程的工作目录
- __dirname: nodejs全局变量，获取当前文件所在目录完整目录名
- __filename: 带完整路径得文件名

- path.join(path1,path2,path3) 把路径字符串连起来并规范路径
- path.resolve([from...],to) 相当于cd操作

**loader：**
https://www.jianshu.com/p/c89f1f3fd4af

**plugin：**
https://blog.csdn.net/yolo0927/article/details/85017565
https://www.jianshu.com/p/02e3f743659b


**new 后面接带括号的函数**
根据优先级知道 点的优先级高于new
1. new Foo.getName(); // 先 xx = Foo.getName 然后 new xx()
2. new Foo().getName(); // 先 xx = new Foo() 然后 xx.getName()
3. new new Foo().getName(); // 先 xx = new Foo() 然后 new xx.getName() 回到1的样子