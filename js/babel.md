babel官网 https://babeljs.io/docs/en/

将高版本语法转为低版本需要babel-loader
其中 babel-core 是核心库

@babel/cli 是babel提供的命令行工具，可以通过babel命令对js文件进行编译，babel官网建议在项目中安装 而不是全局安装，依赖babel-core
@babel/node 跟node cli类似，不适用在产品中，适合全局安装

@babel/preset-env主要是将高版本语法转为低版本
@babel/polyfill将不同浏览器之间的差异抹平，然而会将方法添加到全局环境和内置原型中，造成污染,可换成@babel/plugin-transform-runtime

@babel/plugin-transform-runtime可以减小插件大小，需配合@babel/runtime使用
前者安装在开发环境，后者在生产环境
```javascript
    npm install --save-dev @babel/plugin-transform-runtime
    npm install --save @babel/runtime
```