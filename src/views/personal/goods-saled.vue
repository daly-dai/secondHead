<template>
  <div :class="$style.sale">
    <div
      :class="$style.saleItem"
      v-for="(item, index) of goodsList"
      :key="index"
    >
      <div :class="$style.saleItemTop">
        <div>
          <div :class="$style.avatar">
            <img :src="item.avatar" alt="" />
          </div>
          <span>{{ item.buyername }}</span>
        </div>
        <div>{{ getGoodsStatus(item.goodsstatus) }}</div>
      </div>
      <div :class="$style.saleItemContent">
        <div class="contentImg"><img :src="item.imgs[0]" alt="" /></div>
        <div>
          <span>{{ item.desc }}</span>
          <p>￥{{ item.price }}</p>
        </div>
      </div>
      <div :class="$style.saleItemBottom">
        <van-button
          @click.stop="confirmConsignor(item._id)"
          v-if="item.goodsstatus === 1"
          type="default"
          >确认发货</van-button
        >
        <van-button
          v-if="item.goodsstatus >= 3"
          type="danger"
          @click.stop="deleteGoods(item._id)"
          >删除商品</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog, Notify } from 'vant';
export default {
  data() {
    return {
      goodsList: []
    };
  },
  created() {
    this.getGoodsList();
  },
  computed: {
    getGoodsStatus() {
      // eslint-disable-next-line space-before-function-paren
      return function(status) {
        if (status === 1) {
          return '待交付';
        }

        if (status === 2) {
          return '待验货';
        }

        if (status === 3) {
          return '已交付';
        }

        if (status >= 4) {
          return '已交付';
        }

        return '';
      };
    }
  },
  methods: {
    /**
     * @description 获取卖出的商品
     */
    getGoodsList() {
      this.$api['personal/getGoodsSellering']().then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.goodsList = res.data;
        }
      });
    },
    /**
     * @description 确认发货
     */
    confirmConsignor(id) {
      Dialog.confirm({
        title: '确认发货',
        message: '请确认是否发货成功'
      })
        .then(() => {
          const data = {
            goodsId: id,
            status: 2
          };

          this.$api['personal/setGoodsStatus']({ data }).then(res => {
            if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
              Notify({ type: 'success', message: '发货成功' });
              this.getGoodsList();
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    /**
     * @description 删除商品
     * @param { string } id 商品id
     */
    deleteGoods(goodsId) {
      Dialog.confirm({
        title: '删除商品',
        message: '是否确认删除该商品,删除后将无法恢复'
      })
        .then(() => {
          const data = {
            goodsId: goodsId
          };

          this.$api['personal/deleteGoodsById']({ data }).then(res => {
            if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
              Notify({ type: 'success', message: '删除成功' });
              this.getGoodsList();
            } else {
              Notify({ type: 'warning', message: '删除失败' });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="less" module>
.sale {
  .full-y;
  &-item {
    background: #fff;
    margin-bottom: 40px;
    padding: 80px 100px 120px;

    &-top {
      .flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      > div:first-child {
        .flex;
        align-items: center;

        .avatar {
          width: 1em;
          height: 1em;
          border-radius: 55%;
          margin-right: 3%;
          img {
            width: 100%;
            height: 100%;
          }
        }

        span {
          display: inline-block;
          width: 400px;
        }
      }

      > div:last-child {
        color: red;
      }
    }

    &-content {
      .flex;
      align-items: center;

      > div:first-child {
        width: 30%;
        border-radius: 20px;
        img {
          width: 100%;
        }
      }

      > div:last-child {
        margin-left: 3%;
        span {
          max-width: 60%;
          overflow: hidden;
        }

        p {
          color: red;
          font-size: 20px;
        }
      }
    }

    &-bottom {
      .flex;
      justify-content: flex-end;
      > button {
        margin-right: 3%;
      }
    }
  }
}
</style>
