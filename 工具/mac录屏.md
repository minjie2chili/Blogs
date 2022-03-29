​
突然有个录屏的需求，我记得mac有录屏的快捷键 `shift + command + 5`，但是系统要求是 macOS Mojave 或更高版本。刚好差一点版本又不想升级，知道mac有个自带的quickTime player软件也可以录屏，然后就用上了，确实能录屏，but 会把环境音录进去

<div align=center>
<img src="https://img-blog.csdnimg.cn/71d11cee18d44364906fb4dbef426af0.png" alt="quickTime player" />
</div>

要解决这个问题需要下载一个软件 Soundflower
下载完成安装时如果出错，需要在设置 - 安全性与隐私 - 通用中允许软件安装使用

然后找到如下的音频设置软件
<div align=center>
<img src="https://img-blog.csdnimg.cn/4079c5efe0f44da19c1a88a1f8668025.png" width=518 alt="quickTime player" />
</div>


进行如下设置，分别设置好聚集设备和多输出设备：
<div align=center>
<img src="https://img-blog.csdnimg.cn/6235ea04156e4bbca9112b9e8d68a3e0.png" width=404 alt="quickTime player" />
</div>

<div align=center>
<img src="https://img-blog.csdnimg.cn/a80562295828410a8bb6b706a2f65fd6.png" width=404 alt="quickTime player" />
</div>

  在系统偏好设置-声音中选择多输出设备，保证声音
<div align=center>
<img src="https://img-blog.csdnimg.cn/8ad4253cc31c49c2b6c9414d7bf03ace.png" width=404 alt="quickTime player" />
</div>

<div align=center>
<img src="https://img-blog.csdnimg.cn/ebdc64bdd8774c1a8929fe3d3e670fbd.png" width=404 alt="quickTime player" />
</div>

在quickTime player选择刚才设置的soundflower就行 注意2ch还是64ch
<div align=center>
<img src="https://img-blog.csdnimg.cn/5c18cafa4edc4f73a48678b28d398e08.png" width=404 alt="quickTime player" />
</div>

设置完后发现无法更改系统音量了，需要还原音量设置就好了。

​