#### node路径
- process.cwd():nodejs 进程的工作目录
- __dirname: nodejs全局变量，获取当前文件所在目录完整目录名
- __filename: 带完整路径得文件名

- path.join(path1,path2,path3) 把路径字符串连起来并规范路径
- path.resolve([from...],to) 相当于cd操作