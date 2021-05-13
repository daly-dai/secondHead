<template>
  <div :class="$style.sale">
    <div :class="$style.saleItem">
      <div :class="$style.saleItemTop">
        <div>
          <base-svg-icon
            :cls="$style.userAvatar"
            iconName="icontubiaoku"
          ></base-svg-icon>
          <span>测试名称</span>
        </div>
        <div>交易成功</div>
      </div>
      <div :class="$style.saleItemContent">
        <div><img src="/static/images/goodsPlaceholder.jpg" alt="" /></div>
        <div>
          <span>全新的书没有拆过</span>
          <p>￥888</p>
        </div>
      </div>
      <div :class="$style.saleItemBottom">
        <van-button type="default">评价</van-button>
        <van-button type="default">确认发货</van-button>
        <van-button type="danger">删除商品</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" module>
.sale {
  .full-y;
  &-item {
    background: #fff;
    margin-bottom: 40px;
    padding: 120px 100px;

    &-top {
      .flex;
      justify-content: space-between;

      > div:first-child {
        .flex;

        .user-avatar {
          width: 2em;
          height: 2em;
          border-radius: 55%;
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
