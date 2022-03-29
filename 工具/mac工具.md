## 安装oh-my-zsh和zsh-autosuggestion

zsh是区别于bash的一个shell终端，启动后有丰富的背景
zsh-autosuggestion是可以进行命令自动提示的插件

1. 安装oh-my-zsh
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

2. 安装zsh-autosuggestions
```bash
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

3. 编辑~/.zshrc文件
```bash
vim ~/.zshrc
```

4. 按进入insert模式，找到plugin=(git)这一行，将其改成
```bash
plugins=(git zsh-autosuggestions)
```

5. 使命令立即生效
```bash
source ./zshrc
```

## zsh添加bash的环境变量
如提示 zsh: command not found: xxx
```js
open ~/.zshrc
// 在第一行加入
source ~/.bash_profile
source ~/.zshrc
```

## zsh 和 bash 互相切换
```js
// zsh 切到 bash
chsh -s /bin/bash
// bash 切回 zsh
chsh -s /bin/zsh
```