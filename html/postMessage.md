在一个业务需求中，需要从当前网站打开一个其他域名的tab页传递数据，原以为不能实现，没想到很早之前html5就给出了一个API —— `window.postMessage`。

使用方式如下（react版本）：

A页面 http://localhost:3000
```js
declare const __OPEN_SITE_ORIGIN__: string;
const __OPEN_SITE_ORIGIN__ = 'http://localhost:8010';

export default () => {
  const previewWindow = React.useRef<Window | null>(null);

  const preview = () => {
    previewWindow.current = window.open(`${__OPEN_SITE_ORIGIN__}/en/support-center/faq/article-preview`);
  };

  useEffect(() => {
    // waiting for the "request doc" message
    const requestDocListener = (e: MessageEvent) => {
      if (e.origin !== __OPEN_SITE_ORIGIN__) {
        return;
      }
      const data = generatePreviewData();
      previewWindow.current?.postMessage(data, __OPEN_SITE_ORIGIN__);
      console.log('Requested doc:', JSON.stringify(e.data));
    };

    window.addEventListener('message', requestDocListener, false);

    return () => {
      window.removeEventListener('message', requestDocListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model]);
}
```

B页面 http://localhost:8010
```js
useEffect(() => {
  // waiting for the "request doc" message
  const __OPEN_SITE_ORIGIN__ = 'http://localhost:3000';
  const requestDocListener = (e: MessageEvent) => {
    if (e.origin !== __OPEN_SITE_ORIGIN__) {
      return;
    }
    console.log('received data:', e.data);
    // business code
  };
  
  window.addEventListener('message', requestDocListener, false);

  // 当文档加载完毕, 给父级来源发送信息。
  window.addEventListener('load', function(e){
    (e.currentTarget as any).opener.postMessage('ready', __OPEN_SITE_ORIGIN__);
  }, false);

  return () => {
    window.removeEventListener('message', requestDocListener);
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```