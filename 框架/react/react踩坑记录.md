#### 1. 自定义hook的函数命名以use开头（如useSomething，驼峰写法），hook不能用于条件语句中，如果需要条件判断，应该写在hook里面
> ( React component名称需要大写开头 )

#### 2. 异步获取的state值不是最新的state的值

```javascript
// 先点击按钮然后再输入框中输入值，alert的值是点击时num的值（闭包问题）, 改成ref可以解决该问题
function App() {
  const [num, setNum] = useState(0);

  const clickMe = () => {
    setTimeout(() => alert(num), 2000);
  };

  return (
    <>
      <button onClick={clickMe}>click me</button>
      <input
        value={num}
        onChange={e => {
          setNum(e.target.value);
        }}
      />
    </>
  );
}
```
- useMemo中使用的变量如果不加入依赖中就是缓存


#### 3. setState的参数为对象本身时，无法触发组件刷新

```javascript
function App() {

  const [obj,setObj] = useState({
    num: 1,
  });

  const clickMe = () => {
     setObj(v => {
       const newObj = v;
       newObj.num = v.num + 1; // 直接修改num的值不会触发组件刷新，应该改成 const newObj = { ...v };
      return newObj;
     });
  };

  return (
    <button onClick={clickMe}>{obj.num}</button>
  );
}
```
setObj函数写法应该写成
```JS
setObj(v => {
  const newObj = { ...v };
  newObj.num = v.num + 1;
  return newObj;
});

// 或者如下

setObj({
  ...obj,
  num: obj.num + 1,
})

```

#### 4. 异步更新数据
```JS
function App() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1); // 改成函数形式即可
    // setCount(count => count + 1);
  };

  const handleClick = () => {
    increase();
    increase();
    increase();
  };

  return (
    <>
      <button onClick={handleClick}>Increase</button>
      <div>Counter: {count}</div>
    </>
  );
}
```

```JS
function App() {
  const [articleDetail, setArticleDetail] = useState({
    view_count: 0,
    content: '',
  });

  useEffect(() => {
    setArticleDetail({
      ...articleDetail,
      view_count: 100,
    });

    setArticleDetail({
      ...articleDetail,
      content: 'article content',
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>文章内容: {articleDetail.content}</div>
      <div>浏览量: {articleDetail.view_count}</div>
    </>
  );
}
```

useEffect的部分应该改为：
```JS
......

setArticleDetail(articleDetail => {
  return {
    ...articleDetail,
    view_count: 100,
  };
});

setArticleDetail(articleDetail => {
  return {
    ...articleDetail,
    content: 'article content',
  };
});

......
```
