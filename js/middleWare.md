#### 中间件：

express 和 koa 的中间件主要是将 node 接口的请求做了改造，是一个函数，通常接收 req 和 res 作为参数，客户端的每一个请求，需要经过中间件的处理才能往下走。
理解：https://www.cnblogs.com/xiaosongJiang/p/10854467.html

##### redux 中间件

redux middleWare 主要是对 dispatch 进行改造 增加功能

```js
export default function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    // 利用传入的createStore和reducer和创建一个store
    const store = createStore(...args);
    let dispatch = () => {
      throw new Error();
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    };
    // 让每个 middleware 带着 middlewareAPI 这个参数分别执行一遍
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    // 接着 compose 将 chain 中的所有匿名函数，组装成一个新的函数，即新的 dispatch
    dispatch = compose(...chain)(store.dispatch);
    // compose([f, g, h])(x)意思是 f(g(h(x)))
    return {
      ...store,
      dispatch,
    };
  };
}
```

compose
middleWare 举例：
redux-thunk

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
```

redux-promise

```js
import { isFSA } from "flux-standard-action";

function isPromise(val) {
  return val && typeof val.then === "function";
}

export default function promiseMiddleware({ dispatch }) {
  return (next) => (action) => {
    if (!isFSA(action)) {
      return isPromise(action) ? action.then(dispatch) : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(
          (result) => dispatch({ ...action, payload: result }),
          (error) => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}
```
