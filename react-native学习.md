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