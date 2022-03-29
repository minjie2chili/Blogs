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



#### **8. new 后面接带括号的函数**

根据优先级知道 点的优先级高于new

1. new Foo.getName(); // 先 xx = Foo.getName 然后 new xx()

2. new Foo().getName(); // 先 xx = new Foo() 然后 xx.getName()

3. new new Foo().getName(); // 先 xx = new Foo() 然后 new xx.getName() 回到1的样子

   
