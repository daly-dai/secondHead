<template>
  <div :class="$style.home">
    <div :class="$style.homeHead">
      <div>
        易趣
      </div>
      <div :class="$style.homeInput">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="queryParams.community"
            :options="option"
            @change="changeCommunity"
          ></van-dropdown-item>
        </van-dropdown-menu>
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
            <img v-if="item.avatar" :src="item.avatar" alt="" />
            <base-svg-icon v-else iconName="icontubiaoku"></base-svg-icon>
          </div>
          <span :class="$style.userName">{{ item.sellername }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      mainMenu: [],
      goodList: [],
      currentMain: 0,
      option: [],
      queryParams: {
        community: '',
        merchandiseCategory: ''
      }
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    // 初始化页面数据
    async initPage() {
      await this.getCommunity();
      await this.getMerchandiseCategory();

      this.getGoodsData();
    },
    getGoodsData() {
      const params = {
        ...this.queryParams
      };

      this.$api['home/getGoodsByType']({ params }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.goodList = res.data;
        }
      });
    },
    /**
     * @description 切换社区
     */
    changeCommunity(data) {
      this.queryParams.community = data;
      this.getGoodsData();
    },
    /**
     * @description 获取社区
     */
    getCommunity() {
      return new Promise(resolve => {
        this.$api['user/getCommunity']().then(res => {
          if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
            this.option = res.data.map(item => {
              return {
                text: item.name,
                value: item._id
              };
            });
            console.log(this.option, 7777);
            this.queryParams.community = this.option[0].value;

            resolve();
          }
        });
      });
    },
    /**
     * @description 获取所有的商品分类
     */
    getMerchandiseCategory() {
      return new Promise(resolve => {
        this.$api['publish/getMerchandiseCategory']().then(res => {
          if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
            this.mainMenu = res.data.map(item => {
              return {
                name: item.name,
                icon: item.iconname,
                key: item._id
              };
            });

            this.mainMenu.unshift({
              name: '全部',
              icon: 'iconfenlei',
              key: ''
            });

            this.queryParams.merchandiseCategory = this.mainMenu[0].key;

            resolve();
          }
        });
      });
    },
    /**
     * @description 选择商品分类
     */
    selectMainMenu(index) {
      if (index === this.currentMain) return false;

      this.currentMain = index;
      this.queryParams.merchandiseCategory = this.mainMenu[index].key;
      this.getGoodsData();
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
      :global .van-dropdown-menu__bar {
        height: 180px;
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
    max-height: 500px;
    overflow-y: auto;

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
