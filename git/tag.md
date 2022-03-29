#### 创建标签
```js
// 省略 <commit id> 会 tag 目前的 patch
git tag <tag name> <commit id>
// tag有两种，分别是lightweight tag和annotate tag
// lightweight可以视为某个patch的别名
git tag v1.0
// annotate除了有lightweight的功能外，还能添加注释，参数-a等同于--annotate，如下
git tag -a v1.0 -m 'message'
```

#### 查看所有tag
```js
git tag
```

#### 查看某个版本的tag
```js
git tag -l 'v1.0.*'
```
#### 查看tag详情
```js
git show v1.0
```

#### 推送tag
```js
// 推送单个tag
git push origin v1.0
// 推送本地所有tag
git push origin --tags
```

#### 删除tag
```js
// 删除本地tag
git tag -d <tag name>
// eg:
git tag -d v1.0
// 删除远程tag
git push <remote name> :<tag name>
// or
git push origin :refs/tags/v1.0
```
