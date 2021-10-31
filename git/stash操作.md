常用git stash命令：

（1）**`git stash save`**
save "save message" : 执行存储时，添加备注。

（2）**`git stash list`**
查看stash了哪些存储

（3）**`git stash show`**
```JS
// 显示做了哪些改动，默认show第一个存储,如果要显示其他，后面加索引
git stash show stash@{index}
```

（4）**`git stash show -p`**
```JS
// 显示第一个存储的改动,即stash@{0},如果想显示其他存储,后面接索引即可(该命令和上面一条命令的区别是该命令以patch form的形式展示，更详细):
git stash show stash@{index} -p
```

（5）**`git stash apply`**
```JS
// 应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，如果要使用其他的, 后面接索引即可：
git stash apply stash@{index} 
```

（6）**`git stash pop`**
```JS
// 恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即stash@{0}，如果要应用并删除其他stash, 后面接索引即可：
git stash pop stash@{index}
```

（7）**`git stash drop`**
```JS
// 丢弃stash@{index}存储，从列表中删除这个存储
git stash drop stash@{index}
```

（8）**`git stash clear`**
删除所有缓存的stash