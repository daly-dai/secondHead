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
    <div :class="$style.goodsContent">
      <div
        :class="$style.goodsItem"
        v-for="(item, index) of goodList"
        :key="index"
        @click="routerToDetail(33333)"
      >
        <div :class="$style.goodsItemImg">
          <img src="/static/images/goodsPlaceholder.jpg" alt="" />
        </div>

        <div :class="$style.goodsItemTitle">
          {{ item.goodsName }}
        </div>
        <div :class="$style.goodsItemPrice">
          {{ item.price }}
        </div>
        <div :class="$style.goodsItemUser">
          <span :class="$style.userAvatar">
            <img v-if="item.avatar" :src="item.avatar" alt="" />
            <!-- <i v-else class="iconfont icontubiaoku-"></i> -->
            <base-svg-icon iconName="icontubiaoku"></base-svg-icon>
          </span>
          <span :class="$style.userName">{{ item.userName }}</span>
        </div>
      </div>
    </div>
    <div :class="$style.homeBottom">
      <span>猜您喜欢</span>
    </div>
    <van-popup v-model="show">内容</van-popup>
  </div>
</template>
<script>
import { mainMenu, goodList } from './static';
export default {
  name: 'home',
  data() {
    return {
      show: false,
      mainMenu: mainMenu,
      goodList: goodList,
      currentMain: 0
    };
  },
  created() {},
  methods: {
    selectMainMenu(index) {
      if (index === this.currentMain) return false;

      this.currentMain = index;
    },
    /**
     * @description 跳转到商品详情页
     */
    routerToDetail(id) {
      this.$router.push({
        name: 'goods-detail',
        params: {
          id: 7777
        }
      });
    }
  }
};
</script>

<style lang="less" module>
.home {
  padding: 40px 0 120px;
  background: #fff;
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

  .goods-content {
    margin-top: 30px;
    .flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .goods-item {
      width: 48%;
      margin: 60px 0;

      > div:nth-child(n + 2) {
        padding-left: 10%;
      }

      &-img {
        width: 100%;
        height: 600px;
        text-align: left;
        text-align: center;

        img {
          width: 80%;
          height: 100%;
        }
      }

      &-title {
        font-weight: 550;
        font-size: 16px;
        margin-top: 30px;
      }

      &-price {
        color: red;
        margin: 40px 0;
        font-size: 16px;
      }

      &-user {
        .flex;
        font-size: 14px;

        .user-name {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
