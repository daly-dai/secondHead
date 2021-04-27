<template>
  <div :class="$style.home">
    <div :class="$style.homeHead">
      <div>
        <span>易趣</span>
      </div>
      <div :class="$style.homeInput">
        <input type="text" />
      </div>
      <div>
        <span>分类</span>
      </div>
    </div>
    <div :class="$style.homeCenter">
      <div
        :class="$style.homeCenterItem"
        v-for="(item, index) of mainMenu"
        :key="index"
        @click="selectMainMenu(index)"
      >
        <div
          :class="[$style.itemIcon, currentMain === index ? $style.active : '']"
        >
          <i class="iconfont" :class="item.icon"></i>
        </div>
        <div
          :class="{
            [$style.itemName]: true
          }"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div :class="$style.goodsContent"></div>
    <div :class="$style.homeBottom">
      <span>猜您喜欢</span>
    </div>
    <van-popup v-model="show">内容</van-popup>
  </div>
</template>
<script>
import { mainMenu } from './static';
export default {
  name: 'home',
  data() {
    return {
      show: false,
      mainMenu: mainMenu,
      currentMain: 0
    };
  },
  created() {},
  methods: {
    selectMainMenu(index) {
      if (index === this.currentMain) return false;

      this.currentMain = index;
    }
  }
};
</script>

<style lang="less" module>
.home {
  padding: 40px 0;
  &-head {
    display: flex;
    > div:first-child,
    > div:last-child {
      width: 240px;
    }

    .home-input {
      flex: 1;
      input {
        width: 80%;
        margin: 0 auto;
        display: inline-block;
      }
    }
  }

  &-center {
    background: url('/static/images/homeBg.png') no-repeat;
    // background-color: rgba(255, 255, 255);
    background-size: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-top: 81px;

    &-item {
      width: 32%;
      margin-bottom: 81px;
      text-align: center;
      .item-icon {
        .flex-center;
        width: 200px;
        height: 200px;
        margin: 0 auto;
        background-color: rgba(255, 255, 255, 0.4);
        border-radius: 160px;
        /* stylelint-disable */
        i {
          font-size: 24px;
          color: white;
          margin-right: 0 !important;
          display: inline-block;
          position: absolute;
        }
      }

      .active {
        background-image: radial-gradient(
          rgba(102, 230, 255),
          rgba(0, 173, 255),
          rgba(136, 223, 255)
        );
      }

      .item-name {
        margin-top: 30px;
        font-size: 15px;
        color: #333;
      }
    }
  }
}
</style>
