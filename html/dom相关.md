
#### clientHeight和offsetHeight

- clientHeight不包含border和滚动条高度，后者包含

#### DomContentLoaded和load的区别

DomContentLoaded会在dom加载完成执行

load会在dom加载完，样式表，图片都加载后执行

iframe会阻塞主页面的onload事件



#### attribute 和 property 的区别是什么？

Attribute就是dom节点自带的属性，例如html中常用的id、class、title、align等。

而Property是这个DOM元素作为对象，其附加的内容，例如childNodes、firstChild等。



#### 白屏时间和首屏时间

- 白屏时间是指输入网址回车到页面出现第一个字符或元素的时间。

  通常认为浏览器解析渲染完<head>标签或开始渲染<body>标签的时刻是白屏结束时间。

- 首屏时间是指输入网址回车到浏览器首屏（看到的第一屏）内容渲染完成的时间（包含图片等元素加载完成）。

  在国内的网络条件下，通常一个网站，如果“首屏时间”在2秒以内是比较优秀的，5秒以内用户可以接受，10秒以上就不可容忍了。