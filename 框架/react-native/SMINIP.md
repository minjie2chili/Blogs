#### <center>SMINIP的相关依赖</center>
##### 1. react-navigation
设置导航栏相关的依赖 详情见 https://reactnavigation.org/docs/en/getting-started.html

##### 2. react-native-safe-area-view
安全区域 比如适配iphone x等手机，在屏幕可用范围内进行操作

##### 3. react-native-root-siblings
比如一些弹窗等原生组件 可使用该库调用相应方法
new RootSiblings(<PopViewContainer {...options}>)

##### 4. immutable和react-immutable-render-mixin
这两个库是因为react为了性能优化引入了PureRenderMixin，使得一些state只能浅比较，如{name:"rick and morty"}变成{name:"rick and morty"}后还会重新渲染，所以需要进行深比较，react-immutable-render-mixin可以直接比较immutable对象的hashcode

#### <center>SMINIP的测试库</center>
jest单元测试需要安装jest babel-jest babel-preset-react-native
```
npm install jest babel-jest babel-preset-react-native --save-dev
```
react代码分为核心代码和renderer代码。自带3种renderer，其中：
- react-dom 负责将组建渲染到浏览器
- react-native-renderer 负责将组件渲染成原生的view
- react-test-renderer 负责将组件输出成json对象以便进行遍历、断言测试

配置jest选项 设置preset为react-native
react-native-renderer相关介绍：
https://baijiahao.baidu.com/s?id=1602512288163937867&wfr=spider&for=pc


#### 封装原生组件
requireNativeComponent通常接受两个参数，第一个参数是原生视图的名字，而第二个参数是一个描述组件接口的对象。组件接口应当声明一个友好的name，用来在调试信息中显示；组件接口还必须声明propTypes字段，用来对应到原生视图上。这个propTypes还可以用来检查用户使用View的方式是否正确。

注意，如果你还需要一个JavaScript组件来做一些除了指定name和propTypes以外的事情，譬如事件处理，你可以把原生组件用一个普通React组件封装。在这种情况下，requireNativeComponent的第二个参数变为用于封装的组件。这个在后文的MyCustomView例子里面用到。

```javascript
// ImageView.js

import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var iface = {
  name: 'ImageView',
  propTypes: {
    src: PropTypes.string,
    borderRadius: PropTypes.number,
    resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch']),
    ...View.propTypes // 包含默认的View的属性
  },
};

module.exports = requireNativeComponent('RCTImageView', iface);
```
```javascript
// MyCustomView.js

class MyCustomView extends React.Component {
  constructor() {
    this._onChange = this._onChange.bind(this);
  }
  _onChange(event: Event) {
    if (!this.props.onChangeMessage) {
      return;
    }
    this.props.onChangeMessage(event.nativeEvent.message);
  }
  render() {
    return <RCTMyCustomView {...this.props} onChange={this._onChange} />;
  }
}
MyCustomView.propTypes = {
  /**
   * Callback that is called continuously when the user is dragging the map.
   */
  onChangeMessage: React.PropTypes.func,
  ...
};

var RCTMyCustomView = requireNativeComponent(`RCTMyCustomView`, MyCustomView, {
  nativeOnly: {onChange: true}
});
```
更多内容查看 https://reactnative.cn/docs/0.51/native-component-android.html