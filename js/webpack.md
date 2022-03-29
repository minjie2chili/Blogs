#### loader和plugin区别
https://github.com/yndtemps/webpack-learning
**loader：**
https://www.jianshu.com/p/c89f1f3fd4af

**plugin：**
https://blog.csdn.net/yolo0927/article/details/85017565
https://www.jianshu.com/p/02e3f743659b

**webpack速度分析**
```JS
// 速度分析：使用speed-measure-webpack-plugin
// 使用：将默认配置文件包裹起来

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

//将默认的webpack配置文件包裹起来
const webpackConfig = smp.wrap({
  plugins: [
    new MyPlugin(),
    new MyOtherPlugin()
  ]
});
```

**webpack体积分析**
```JS
// 代码示例：构建完成后会在 8888 端口展示大小

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
};
```