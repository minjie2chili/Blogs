#### console面板
var a = 1,b=2,c=3;
1. console.table({a,b,c}) // 效果为 {a:1,b:2.c:3}
2. console.log("%c"+a, "color:red;font-size:20px") // 显示红色20px的字
3. copy(a)——剪贴板中就有了a的值
4. 打印dom节点用console.dir(li)


#### element面板
1. 选中元素按下h能隐藏对应元素
2. 一个一个的去点击级联的 ▶ 按钮太慢了，不如使用右击节点后的 expand recursively 命令：
3. 截屏：command+shift+p 搜索screen就有截屏相关的功能 可以截取node或者整个网页
4. 换背景：command+shift+p 搜索theme


#### source面板
1. snippets： new snippets然后在里面写代码 可以直接运行 比直接在console中输入代码方便 