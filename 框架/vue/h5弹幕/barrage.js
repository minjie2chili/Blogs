class Barrage {
  constructor(data) {
    this.MAX_DM_COUNT = data.MAX_DM_COUNT;
    this.CHANNEL_COUNT = data.CHANNEL_COUNT;
    this.el = data.el;
    this.danmuContentClass = data.danmuContentClass || "content";
    /**
     * 设置 弹幕DOM池 设置通道数和弹幕数
     **/
    (this.duration = data.duration || 2000), (this.danmuPool = data.danmuPool); // 弹幕池
    this.domPool = []; // 通道数
    this.hasPosition = []; //标记每个通道目前是否有位置
    this.init();
  }

  init() {
    let wrapper = document.getElementById(this.el);
    const parentNode = wrapper.parentNode;
    let dom = parentNode.removeChild(wrapper);
    for (let j = 0; j < this.CHANNEL_COUNT; j++) {
      let doms = [];
      for (let i = 0; i < this.MAX_DM_COUNT; i++) {
        let clonedNode = dom.cloneNode(true);
        parentNode.appendChild(clonedNode);
        doms.push(clonedNode);

        // 每次到transition结束的时候 就是弹幕划出屏幕了 将DOM位置重置 再放回DOM池
        clonedNode.addEventListener("transitionend", () => {
          // clonedNode.style.cssText = "";
          clonedNode.classList.remove("leftStyle");
          this.domPool[j].push(clonedNode);
        });
      }

      this.domPool.push(doms);
    }

    // hasPosition 标记每个通道目前是否有位置
    for (let i = 0; i < this.CHANNEL_COUNT; i++) {
      this.hasPosition[i] = true;
    }
  }

  /**
   * 获取一个可以发射弹幕的通道 没有则返回-1
   */
  getChannel() {
    for (let i = 0; i < this.CHANNEL_COUNT; i++) {
      if (this.hasPosition[i] && this.domPool[i].length) return i;
    }
    return -1;
  }
  /*
   * loop: 是否循环
   */
  start(loop, cb, userDanmulList) {
    if (typeof cb === "function") {
      let myDanmu = userDanmulList[0];
      if (myDanmu) {
        this.danmuPool.unshift(myDanmu);
        cb();
      }
    }
    this.timer = setInterval(() => {
      // 弹幕池发弹幕
      let channel = this.getChannel();
      if (this.danmuPool.length && channel != -1) {
        let dom = this.domPool[channel].shift();
        let danmu = this.danmuPool.shift();
        this.shootDanmu(dom, danmu, channel);
        loop && this.danmuPool.push(danmu);
      }
    }, this.duration);
  }

  destroy() {
    clearInterval(this.timer);
  }

  isImgElement(dom) {
    return dom.nodeName.toUpperCase() === "IMG";
  }
  /**
   * 根据DOM和弹幕信息 发射弹幕
   */
  shootDanmu(dom, danmu, channel) {
    if (typeof danmu === "object") {
      Object.entries(danmu).forEach(values => {
        const key = values[0];
        const selectedDom = dom.querySelector(`.${key}`);
        const value = values[1];
        if (selectedDom) {
          if (this.isImgElement(selectedDom) && value) {
            selectedDom.src = value;
          } else {
            selectedDom.innerText = value;
          }
        }
      });
    } else {
      const selectedDom = dom.querySelector(`.${this.danmuContentClass}`);
      const value = values[1];
      if (selectedDom) {
        if (this.isImgElement(selectedDom) && value) {
          selectedDom.src = value;
        } else {
          selectedDom.innerText = value;
        }
      }
    }
    // 如果为每个弹幕设置 transition 可以保证每个弹幕的速度相同 这里没有保证速度相同
    // 设置弹幕的位置信息 性能优化 left -> transform
    dom.style.transform = `translateX(${-dom.offsetWidth-200}px)`;
    dom.classList.add("leftStyle");

    this.hasPosition[channel] = false;
    // 弹幕全部显示之后 才能开始下一条弹幕
    // 大概 dom.offsetWidth * 10 的时间 该条弹幕就从右边全部划出到可见区域 再加1秒保证弹幕之间距离
    setTimeout(() => {
      this.hasPosition[channel] = true;
    }, dom.offsetWidth * 10 + 1000);
  }
}

export default Barrage;
