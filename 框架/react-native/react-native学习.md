#### 1. react-native可以自动识别平台
BigButton.ios.js
BigButton.android.js
去掉平台扩展名直接引用
import BigButton from "./BigButton"

#### 2. 动态资源 和 base64图片需要手动指定尺寸大小
```javascript
<Image source={{url:"https://facebook.github.io/react/logo-og.png"}} 
    style={{height:400,width:400}}/>
```

#### 3. jsbridge原理
- js调原生：通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。
- 原生调js：Native 调用 JavaScript，其实就是执行拼接 JavaScript 字符串，从外部调用 JavaScript 中的方法，因此 JavaScript 的方法必须在全局的 window 上。