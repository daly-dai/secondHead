<template>
  <div :class="$style.confirm">
    <div :class="$style.confirmTop">
      <div :class="$style.goodsImg">
        <img :src="goodsData.imgs[0] || ''" alt="" />
      </div>
      <span>{{ goodsData.desc }}</span>
    </div>
    <div :class="$style.confirmDetail">
      <!-- <div>收获地址</div> -->
      <div :class="$style.confirmDetailCenter">
        <div>{{ userData.name }}</div>
        <!-- <div>浙江省杭州市江干区下沙街道</div>
        <div>松合时代商城</div> -->
      </div>
      <div>></div>
    </div>
    <div :class="$style.confirmBottom">
      <div>
        <p>实付款:</p>
        <p :class="$style.price"><span>￥</span>{{ goodsData.price }}</p>
      </div>
      <div :class="$style.confirmButtons" @click="buyGoods">确认购买</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsData: {},
      userData: '',
      address: ''
    };
  },
  created() {
    this.userData = this.$store.getters['platform/getData'];
    this.getGoodsDetail();
  },
  methods: {
    /**
     * @description 获取商品详情数据
     */
    getGoodsDetail() {
      const params = {
        goodsId: this.$route.params.id
      };

      this.$api['home/getGoodsById']({ params }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.goodsData = res.data;
        }
      });
    },
    /**
     * @description 购买商品
     */
    buyGoods() {
      const data = {
        goodsId: this.$route.params.id,
        status: 1
      };

      this.$api['home/confirmGoodsStatus']({ data }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.$router.push({
            name: 'goods-buyer',
            params: {
              id: this.$route.params.id
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" module>
.confirm {
  .full-y;
  padding: 40px;
  &-top {
    .flex;
    align-items: top;
    background: #fff;
    border-radius: 30px;
    padding: 20px;
    margin-top: 40px;

    .goods-img {
      width: 800px;
      border-radius: 15px;

      img {
        border-radius: 15px;
        width: 100%;
      }
    }

    > span {
      padding-top: 30px;
    }
  }

  &-detail {
    .flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    height: 400px;
    margin-top: 50px;
    padding: 0 60px;
    border-radius: 30px;

    &-center {
      text-align: right;
    }
  }

  &-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 400px;
    background: #fff;
    // width: 100%;
    .flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 200px;

    > div:first-child {
      font-size: 18px;
      .flex;
      align-items: center;
      > p:last-child {
        color: red;
        margin-right: 40px;
        font-weight: 550;
        font-size: 24px;
        > span {
          font-size: 14px;
        }
      }
    }

    .confirm-buttons {
      padding: 60px 100px;
      background: red;
      color: #fff;
      border-radius: 180px;
      font-weight: 550;
      font-size: 16px;
      letter-spacing: 10px;
    }
  }
}
</style>
