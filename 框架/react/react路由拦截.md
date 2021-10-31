有时候我们想要在跳转到其他页面之前进行拦截提示，可以使用react官方提供的 Prompt 组件（官方网址：https://reactrouter.com/core/api/Prompt），使用方式如下：

> Prompt 组件的message属性返回为false时会拦截

```js
import { Prompt } from 'react-router-dom';

const isBlocking = React.useRef(false);

<Prompt
  message={
    (location, action) => {
      if (isBlocking.current) {
        return true;
      }
      Modal.confirm({
        title: 'Confirm',
        content: 'Are you sure to exit - you will not be able to recover the article content.',
        onOk: () => {
          isBlocking.current = true;
          if (action === 'POP') {
            history.goBack();
          } else if (action === 'PUSH') {
            history.push(location);
          } else {
            history.replace(location);
          }
        },
      });
      return false;
    }
  }
/>
```