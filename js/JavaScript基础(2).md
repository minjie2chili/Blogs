

#### jsonp
```js
function sendRequest(){
    jsonp("http://localhost:8100",{
        a:222,
        b:333
    },"getData").then(data=>console.log("返回数据",data))
}
function jsonp(url,params,callback){
    return new Promise((resolve,reject)=>{
        let script = document.createElement("script");
        window[callback] = function(data){
            resolve(data);
            document.body.removeChild(script)
        }
        console.log(url,params,callback)
        params = {...params,callback};
        let arr = [];
        for(const a of Object.entries(params)){
            arr.push(a[0]+"="+a[1])
        }
        script.src = url+"?"+arr.join("&");
        document.body.appendChild(script)
    })
}
```


#### 闭包
2. 闭包的表现形式
返回一个函数
将函数作为参数传入

网络IO
文件IO


> js引入json配置文件可直接import

#### 隐式类型转换
根据mdn的定义
> Symbol.toPrimitive 是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数。
1. 如果对象部署了[Symbol.toPrimitive]接口，调用此接口，如果返回不是基本数据类型，抛出错误；
2. 如果对象没有部署[Symbol.toPrimitive]接口，先返回valueOf的值，如果返回不是基本数据类型；调用返回toString的值，如果返回不是基本数据类型，抛出错误

其中第1步中的[Symbol.toPrimitive]，会接收一个hint作为入参，hint是"number"时，优先调用valueOf；hint是"string"时，优先调用toString
当运行环境明确表示需要转换为number时，hint传number；如+obj
当运行环境明确表示需要转换为number时，hint传number；如`${obj}`
当使用+号操作时，如果其中一项是字符串，hint传"string"；当两个都不是字符串时，hint传"number"(Date对象例外，默认传入"string")



#### 4. package-lock.json

  文件的作用主要是记录项目依赖的信息，可以让下一次更新更快，同时防止下一次更新版本升级



#### 5. window.onerror和window.addEventListener("error",function(){},true)

  window.addEventListener("error",function(){})可以监听unhandledrejection和资源加载失败场景



#### 6. 函数式编程类似f(g(h(x)))



#### 7. 浏览器是多进程的，含有浏览器主进程（负责协调）和第三方插件进程、渲染器进程

每个标签是一个进程，渲染器进程包括GUI渲染进程、JS引擎进程、事件触发进程、定时器触发进程、HTTP请求进程

GUI渲染进程和JS引擎互斥

CSS 不阻塞dom树，但会阻塞render tree（HTML+CSS）


#### 9. 同步和异步

同步和异步描述的是进程/线程的调度方式

同步调用指的是进程/线程发起调用后，一直等待调用返回后才继续执行下一步操作，这并不代表cpu会在这段时间一直等待，操作系统多半会切换到另外的进程/线程上，等到调用返回后再切回原来的进程/线程

异步调用时 进程/线程会继续向下执行，当调用返回，通过某种手段通知调用者。

#### 10. 阻塞和非阻塞

阻塞和非阻塞是针对io状态而言

对于io来说，通常分为两个阶段，准备数据和返回结果。阻塞io会在进程发起一次系统调用后，进程一直等待上述阶段完成，再重新运行。

非阻塞io与其不同的是进程发起调用后如果数据没就绪，就会马上有一个结果返回给进程。和阻塞io区别是用户进程会不断查询内核状态，这个过程依然同步。

单线程支持高并发 通过异步+事件驱动io实现


## rxjs
1. subscribe和unsubscribe
调用unsubscribe后，即使再调用next，也不会再运行，因为observable和observer的连接已经断开

双冒号操作符 ::
source$:map 表示将map函数的this绑定到source$上