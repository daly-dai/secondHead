<template>
  <div :class="$style.buyer">
    <van-steps :active="active" active-color="#333">
      <van-step v-for="(item, index) of statusList" :key="index">{{
        item
      }}</van-step>
    </van-steps>

    <div :class="$style.buyerStatus">
      <span>等待卖家发货</span>
      <span>本平台只提供见证的信息记录。货物交易均为线下交易</span>
    </div>
    <div :class="$style.buyerDetail">
      <div :class="$style.buyerDetailImg">
        <img
          v-if="goodsData.imgs && goodsData.imgs[0]"
          :src="goodsData.imgs[0]"
          alt=""
        />
      </div>
      <div :class="$style.buyerDetailDesc">{{ goodsData.desc }}</div>
      <div>￥{{ goodsData.price }}</div>
    </div>

    <div :class="$style.buyerMessage">
      <div>
        <span>收货人信息：</span><span>{{ goodsData.buyername }}</span>
      </div>
      <div>
        <span>商品价格：</span><span>￥{{ goodsData.price }}</span>
      </div>
    </div>
    <div :class="$style.buyerBottom">
      <p
        v-for="(item, index) of buttonsMap"
        :style="{
          background: item.bgColor,
          color: item.color || '#333'
        }"
        :key="index"
        @click="item.fun"
      >
        {{ item.text }}
      </p>
    </div>
  </div>
</template>
<script>
import { Dialog, Notify } from 'vant';
export default {
  data() {
    return {
      active: 1,
      statusList: ['已拍下', '待发货', '待收货', '已收货', '待评价'],
      statusMap: {
        1: 'obligation', // 待收货
        2: 'received', // 已发货
        3: 'successfulDeal'
      },
      goodsData: {},
      buttonStatus: {
        // 待收货
        obligation: {
          buttons: [
            {
              text: '取消购买',
              bgColor: '#fff',
              fun: this.cancelPurchase
            },
            {
              text: '提醒发货',
              bgColor: 'rgba(238, 241, 9, 0.5)',
              fun: this.remindDelivery
            }
          ]
        },
        received: {
          buttons: [
            {
              text: '确认收货',
              bgColor: 'red',
              color: '#fff',
              fun: this.confirmGoods
            }
          ]
        },
        successfulDeal: {
          buttons: [
            {
              text: '评价',
              bgColor: 'rgba(238, 241, 9, 0.5)',
              fun: this.evaluationOrder
            }
          ]
        }
      }
    };
  },
  computed: {
    buttonsMap() {
      const list = this.buttonStatus[this.statusMap[this.active]].buttons;

      return list;
    }
  },
  created() {
    this.goodsId = this.$store.getters['goods/getGoodsId'];
    this.initPageData();
  },
  methods: {
    /**
     * @description 初始化页面的数据
     */
    initPageData() {
      const params = {
        goodsId: this.goodsId
      };

      this.$api['home/getGoodsById']({ params }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.goodsData = res.data;
          this.active = this.goodsData.goodsstatus;
        }
      });
    },
    /**
     * @description 提醒发货
     */
    remindDelivery() {
      return false;
    },
    /**
     * @description 取消发货
     */
    cancelPurchase() {
      Dialog.alert({
        title: '取消购买',
        message: '是否确认取消购买',
        theme: 'round-button'
      }).then(() => {
        const data = {
          goodsId: this.goodsId
        };

        this.$api['home/cancelPurchase']({ data }).then(res => {
          if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
            Notify({ type: 'success', message: '取消购买成功' });
            this.$router.push({
              name: 'root'
            });
          }
        });
      });
    },
    /**
     * @description 确认收货
     */
    confirmGoods() {
      Dialog.alert({
        title: '确认收货',
        message:
          '确认收货以后，钱货两讫。如出现商品问题请私下去沟通，请谨慎操作',
        theme: 'round-button'
      }).then(() => {
        const data = {
          goodsId: this.goodsId,
          status: 3
        };

        this.$api['personal/setGoodsStatus']({ data }).then(res => {
          if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
            Notify({ type: 'success', message: '收货成功' });
            this.initPageData();
          }
        });
      });
    },
    /**
     * @description 确认收货
     */
    evaluationOrder() {}
  }
};
</script>
<style lang="less" module>
.buyer {
  .full-y;

  &-status {
    padding: 40px;
    background: #fff;
    margin: 50px 0;

    > span {
      display: block;
      margin: 10px;
    }

    > span:first-child {
      font-size: 18px;
      font-weight: 550;
      margin-bottom: 40px;
    }

    > span:last-child {
      color: red;
    }
  }

  &-detail {
    .flex;
    align-items: top;
    background: #fff;
    border-radius: 30px;
    padding: 40px;
    margin-top: 40px;

    &-img {
      width: 30%;
      border-radius: 15px;

      img {
        border-radius: 15px;
        width: 100%;
      }
    }

    &-desc {
      flex: 1;
      margin-left: 2%;
    }

    > div:last-child {
      color: #999;
    }
  }

  &-message {
    background: #fff;
    padding: 80px 40px 100px;
    margin-top: 60px;

    > div {
      .flex;
      justify-content: space-between;

      > span:last-child {
        font-size: 18px;
        font-weight: 550;
      }
    }

    > div:first-child {
      border-bottom: 1px solid rgba(153, 153, 153, 0.5);
      padding-bottom: 80px;
      margin-bottom: 80px;
    }

    > div:last-child {
      > span:last-child {
        color: red;
      }
    }
  }

  &-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: #fff;
    .flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 200px;

    > p {
      padding: 60px 100px 50px;
      border-radius: 180px;
      font-weight: 550;
      font-size: 16px;
      letter-spacing: 10px;
    }

    > p:first-child {
      border: 1px solid rgba(153, 153, 153, 0.5);
    }

    > p:last-child {
      margin-left: 5%;
      background: rgba(238, 241, 9, 0.5);
    }
  }
}
</style>
