<template>
  <div class="comments-box">
    <div class="rightStyle" id="offical-comment" :style="{ transform: `translateX(${screenWidth})`}">
      <div class="title"></div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Barrage from "@/utils/barrage";
let officialBarrage = null;
export default {
  computed: {
    ...mapGetters(["officalBarrageList","screenWidth"])
  },
  mounted() {
    // 发送官方弹幕 参数为间隔
    this.getOfficalComment(2000);
  },
  methods: {
    getOfficalComment(duration) {
      let contentArr = this.officalBarrageList;
      let barrageArr = contentArr.map(item => {
        return {
          // src: require("@/assets/helper.png"),
          content: item.elementDesc,
          title: "小助手"
        };
      });
      officialBarrage = new Barrage({
        MAX_DM_COUNT: barrageArr.length,
        CHANNEL_COUNT: 1,
        danmuPool: barrageArr,
        el: "offical-comment"
      });
      officialBarrage.start(false);
    }
  },
  destroyed() {
    clearInterval(officialBarrage);
  }
};
</script>

<style lang="less" scoped>
.comments-box {
  position: absolute;
  top: 8rem;
  width: 100%;
  z-index: 3;
}
.rightStyle {
  position: absolute;
  padding: 6px 20px;
  color: #fff;
  border-radius: 2em;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.4);
}
.leftStyle {
  user-select: none;
  transition: transform 7s linear;
}
</style>