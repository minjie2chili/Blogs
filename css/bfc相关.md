#### 1. BFC相关知识点
- bfc内，盒子垂直排列；
- 同一个bfc的两个元素的margin会发生垂直合并，使用bfc可保证margin都生效，因为bfc是页面上的一个独立容器，容器子元素不影响外面的元素
- 计算bfc高度，浮动元素也算在内
- bfc的区域不会与float box重叠，所以一个兄弟元素为float时，防止两者重叠，可把一个元素设置bfc

##### 创建bfc
根元素
浮动元素，float不为none
position为absolute或fixed
overflow不为visible的元素
display为inline-block，table-cell，table-caption
