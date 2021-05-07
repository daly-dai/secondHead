<template>
  <div :class="$style.detail">
    <div :class="$style.detailTop">
      <div :class="$style.userImg">
        <img :src="goodsData.avatar" alt="" />
      </div>
      <div>{{ goodsData.goodsname }}</div>
    </div>
    <p :class="$style.detailPrice">￥{{ goodsData.price }}</p>
    <div :class="$style.detailDesc">
      {{ goodsData.desc }}
    </div>
    <div :class="$style.detailImgs">
      <div
        v-for="(item, index) of goodsData.imgs"
        :key="index"
        :class="$style.detailImgsItem"
      >
        <img :src="item" alt="" />
      </div>
    </div>
    <div :class="$style.detailBottom" @click="routerConfirm">
      我想要
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      goodsData: {}
    };
  },
  created() {
    this.getGoodsDetail();
  },
  methods: {
    ...mapActions(['goods/updateGoodsId']),
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
    routerConfirm() {
      this['goods/updateGoodsId'](this.$route.params.id);

      this.$router.push({
        name: 'goods-confirm'
      });
    }
  }
};
</script>
<style lang="less" module>
.detail {
  background: #fff;
  padding: 30px;
  padding-bottom: 240px;
  height: 100%;

  &-top {
    .flex;
    align-items: center;
    padding: 20px 0 50px;
    border-bottom: 1px solid rgba(153, 153, 153, 0.3);

    .user-img {
      width: 3em;
      height: 3em;
      // background: #999;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  &-imgs {
    margin-top: 30px;
    &-item {
      width: 90%;
      text-align: center;
      margin: 0 auto;
      margin-top: 40px;
      img {
        width: 100%;
      }
    }
  }

  &-price {
    color: red;
    font-weight: 550;
    font-size: 18px;
  }

  &-desc {
    padding: 0 30px;
  }

  &-bottom {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    height: 240px;
    line-height: 240px;
    // background: rgba(20, 146, 255, 1);
    background: rgb(247, 115, 115, 1);
    font-size: 18px;
    letter-spacing: 10px;
    font-weight: 550;
    color: #fff;
  }
}
</style>
