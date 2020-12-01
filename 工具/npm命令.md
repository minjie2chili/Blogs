#### 1. 查看npm源
npm config list 或者 npm config get registry

#### 2. 查看所有源
nrm ls

#### 3. npm添加源并起一个别名 如bar
nrm add bar http://registry.npm.bar.cn

#### 4. 使用源
npm use bar

#### 5. 测试源的速度 如测试taobao
nrm test taobao

#### 6. 删除源 如bar
nrm del bar

#### 7. 查看npm全局安装包
npm list -g --depth 0

#### 8. npm link
当node_modules中的模块想直接在根目录使用时
如webpack
npm link webpack

#### 9. 查看包版本信息
npm view packageName versions --查看所有远程版本
npm view package version --查看最新版本