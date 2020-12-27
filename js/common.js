// 节流
function throttle(fn,delay,ctx){
  let timer = null, now = 0, last = 0;
  return function(...args){
    if(timer) return;
    now = new Date().getTime()
    if(now - last > delay){
      fn.apply(ctx, args);
      last = now;
    }else{
      timer = setTimeout(() => {
        fn.apply(this, args)
        last = now;
        clearTimeout(timer);
        timer = null;
      },delay)
    }
  }
}
