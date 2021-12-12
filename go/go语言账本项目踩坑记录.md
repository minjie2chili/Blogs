### 加载获取module出错：
module github.com/gin-gonic/gin: Get "https://proxy.golang.org

解决方法：
##### 设置goproxy.io代理
>go env -w GOPROXY="https://goproxy.io"
##### 设置GO111MOUDLE
>go env -w GO111MODULE="on"go mod tidy

添加需要用到但go.mod中查不到的模块,

main.go:3:3: found packages main (main.go) and route (routes.go) in /Users/lmj/program/go/money-record

包是一个文件夹

### 使用air让go程序修改自动重启
```GO
// 进入配置文件编辑状态
nano ~/.bash_profile（或者vim）

// 配置路径
export GOPATH=/Users/lmj/go
alias air="$GOPATH/bin/air"

// 使修改的bash_profile文件生效
source ~/.bash_profile
```

### 模块导入区别
1. 点操作

```GO
import(. "fmt")
```
>有时候会看到如上的方式导入包，这个点操作的含义就是这个包导入之后在你调用这个包的函数时，你可以省略前缀的包名，也就是前面你调用的fmt.Println(“hello world”)  可以省略的写成Println(“hello world”)

2. 别名操作
```go
import(f "fmt")
```
>别名操作顾名思义可以把包命名成另一个用起来容易记忆的名字，别名操作调用包函数时前缀变成了重命名的前缀，即f.Println(“hello world”)

3. _操作   这个操作经常是让很多人费解的一个操作符，请看下面这个import
```go
import ( “database/sql” _ “github.com/ziutek/mymysql/godrv” ) 
```
>_操作其实只是引入该包。当导入一个包时，它所有的init()函数就会被执行，但有些时候并非真的需要使用这些包，仅仅是希望它的init()函数被执 行而已。这个时候就可以使用_操作引用该包了。即使用_操作引用包是无法通过包名来调用包中的导出函数，而是只是为了简单的调用其init函数()。

包默认都被导出？

### 总结
定义变量时不使用var，声明并赋值，编译器自动判断类型

Struct的命名和数据库名一致

Get 获取所有查询参数

`json:"label"`
注意打tag需要有双引号
结构体中成员变量需要大写字母开头, 不然小写字母默认为私有变量

获取参数类型转换 string >> int

新建的.gitignore不起作用：
```go
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

TotalAmount 首字母大写？？

