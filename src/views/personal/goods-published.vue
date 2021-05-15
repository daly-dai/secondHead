<template>
  <div :class="$style.publish">
    <div
      :class="$style.publishItem"
      v-for="(item, index) of goodsList"
      :key="index"
    >
      <div :class="$style.publishItemContent">
        <div><img :src="item.imgs[0]" alt="" /></div>
        <div>
          <span>{{ item.desc }}</span>
          <p>￥{{ item.price }}</p>
        </div>
      </div>
      <div :class="$style.publishItemBottom">
        <van-button type="default" @click="routerToGoodsEdit(item._id)"
          >编辑商品</van-button
        >
        <van-button type="danger" @click="deleteGoods(item._id)"
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
  methods: {
    /**
     * @description 获取商品列表
     */
    getGoodsList() {
      const params = {
        goodsstatus: 0
      };

      this.$api['personal/getGoodsByStatus']({ params }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.goodsList = res.data;
        }
      });
    },
    /**
     * @description 删除商品
     * @param { string } id 商品id
     */
    deleteGoods(goodsId) {
      Dialog.confirm({
        title: '删除商品',
        message: '是否确认删除该商品'
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
    },
    /**
     * @description 跳转到编辑页面
     */
    routerToGoodsEdit(goodsId) {
      this.$router.push({
        name: 'goods-edit',
        params: {
          goodsId
        }
      });
    }
  }
};
</script>
<style lang="less" module>
.publish {
  .full-y;
  &-item {
    background: #fff;
    margin-bottom: 40px;
    padding: 120px 100px;

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
