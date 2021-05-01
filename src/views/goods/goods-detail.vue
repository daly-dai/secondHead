<template>
  <div :class="$style.detail">
    <div :class="$style.detailTop">
      <div :class="$style.userImg"></div>
      <div>测试名称一</div>
    </div>
    <p :class="$style.detailPrice">
      ￥1500
    </p>
    <div :class="$style.detailDesc">
      sdcvhdsbkjsdkfjsdkjfsd kjvbsdkjfdsfhjsdkjfbks;jbvksajbzdf
      sdcvhdsbkjsdkfjsdkjfsd kjvbsdkjfdsfhjsdkjfbks;jbvksajbzdf
      sdcvhdsbkjsdkfjsdkjfsd kjvbsdkjfdsfhjsdkjfbks;jbvksajbzdf
      sdcvhdsbkjsdkfjsdkjfsd kjvbsdkjfdsfhjsdkjfbks;jbvksajbzdf
      sdcvhdsbkjsdkfjsdkjfsd kjvbsdkjfdsfhjsdkjfbks;jbvksajbzdf
    </div>
    <div :class="$style.detailImgs">
      <div
        v-for="(item, index) of 7"
        :key="index"
        :class="$style.detailImgsItem"
      >
        <img src="/static/images/goodsPlaceholder.jpg" alt="" />
      </div>
    </div>
    <div :class="$style.detailBottom">
      我想要
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
.detail {
  background: #fff;
  padding: 30px;
  padding-bottom: 240px;

  &-top {
    .flex;
    align-items: center;
    padding: 20px 0 50px;
    border-bottom: 1px solid rgba(153, 153, 153, 0.3);

    .user-img {
      width: 3em;
      height: 3em;
      background: #999;
      margin-right: 20px;
    }
  }

  &-imgs {
    background: #fff;
    &-item {
      width: 90%;
      text-align: center;
      margin: 0 auto;
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
