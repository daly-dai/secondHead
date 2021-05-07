<template>
  <div :class="$style.home">
    <div :class="$style.homeHead">
      <div>
        易趣
      </div>
      <div :class="$style.homeInput">
        <input type="text" />
      </div>
      <div>
        分类
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
        @click="routerToDetail(item)"
      >
        <div :class="$style.goodsItemImg">
          <img :src="item.imgs[0]" alt="" />
        </div>

        <div :class="$style.goodsItemTitle">
          {{ item.goodsname }}
        </div>
        <div :class="$style.goodsItemPrice">￥{{ item.price }}</div>
        <div :class="$style.goodsItemUser">
          <div :class="$style.userAvatar">
            <img v-if="item.avatar" :src="'https:' + item.avatar" alt="" />
            <base-svg-icon v-else iconName="icontubiaoku"></base-svg-icon>
          </div>
          <span :class="$style.userName">{{ item.sellername }}</span>
        </div>
      </div>
    </div>
    <!-- <div :class="$style.homeBottom">
      <span>猜您喜欢</span>
    </div> -->
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
      goodList: [],
      currentMain: ''
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    // 初始化页面数据
    initPage() {
      const params = {
        merchandiseCategory: this.currentMain
      };

      this.$api['home/getGoodsByType']({ params }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.goodList = res.data;
        }
      });
    },
    selectMainMenu(index) {
      if (index === this.currentMain) return false;

      this.currentMain = index;
      this.initPage();
    },
    /**
     * @description 跳转到商品详情页
     */
    routerToDetail(item) {
      this.$router.push({
        name: 'goods-detail',
        params: {
          id: item._id
        }
      });
    }
  }
};
</script>

<style lang="less" module>
.home {
  padding: 40px 0 200px;
  background: #fff;
  &-head {
    display: flex;
    align-items: center;
    height: 180px;
    padding: 0 30px;

    > div:first-child,
    > div:last-child {
      width: 240px;
    }

    > div:last-child {
      text-align: right;
    }

    .home-input {
      flex: 1;
      text-align: center;
      input {
        width: 90%;
        border: 0;
        border: 1px solid rgba(153, 153, 153, 0.5);
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
    justify-content: flex-start;
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
        align-items: center;
        height: 140px;

        .user-avatar {
          width: 80px;
          height: 80px;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .user-name {
          font-size: 14px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
