# django语法写邮件模板注意事项

> 工作中有时候会需要写邮件模板，如果需要再添加特别的样式，兼容性和浏览器有比较大的差别，下面总结了一些之前用django写邮件模板遇到的问题（以gmail邮件为主，每个邮件服务商会对模板生成的样式进行不同规则的改造和过滤）

## 样式：
1. `flex布局`由于很多邮件不支持flex布局，所以如果要实现等高布局需要用table-cell，table的布局兼容性比较好；（https://www.cnblogs.com/weiqinl/p/9663596.html）
2. `style标签样式`由于邮件在转发时候不会带上style标签，以防样式丢失，最保险的方式是将样式写在行内；
3. `a标签`：邮件对于a标签会加权重较重的样式，所以如果不需要下划线，需要设置`text-decoration: none !important;`
4. `border`、`border-radius`gmail不支持同时设置border和border-radius，可以用outline代替；
5. `box-shadow`、`负数margin`、`position`、`float`邮件不支持，`CSS3`样式大部分不支持。

## 一些常用的django模板语法：
**1. 函数：macro**

```django
{% macro func_name(params) %}
    // do something
{% endmacro %}
```

**2. if判断：**

```django
<!-- 且和或 -->
{% if condition1 && condition1 %}{% endif %}
{% if condition1 && condition1 %}{% endif %}

<!-- 判断数组长度是否等于1 -->
{% if arr|length_is:1 %}{% endif %}

<!-- 判断数组长度是否小于n -->
{% if arr|length < n %}
```

**3. for循环**

```django
{% for item in arr %}
  <a href="{{item.url}}" target="_blank">{{item.text}}</a>
  <!-- 判断遍历项能否被2整除，遍历项的下标从0开始计算 -->
  {% if forloop.Counter0|divisibleby:2 %}{% endif %}

  <!-- 判断遍历项能否被2整除，遍历项的下标从1开始计算 -->
  {% if forloop.Counter0|divisibleby:2 %}{% endif %}

  <!-- 遍历项最后一项 -->
  {% if forloop.Last %}{% endif %}
  
  <!-- 遍历到剩余n项时 -->
  {% if forloop.Revcounter == n %}{% endif %}
{% endfor %}
```

**4. 定义变量**

```django
<!-- 定义变量 -->
{% with variable1=1 %}{% endwith %}
```

##### 其他HTML邮件书写相关文章：
- [HTML 邮件兼容问题与解决方案](https://segmentfault.com/a/1190000008864116)
- [django官方文档](https://docs.djangoproject.com/zh-hans/4.0/ref/templates/builtins)
- [Django模板语法总结](https://segmentfault.com/a/1190000038854929)