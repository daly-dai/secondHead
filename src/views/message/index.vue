<!--
 * @Author: your name
 * @Date: 2021-01-22 10:44:20
 * @LastEditTime: 2021-01-29 14:46:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \secondHand\src\views\message\index.vue
-->
<template>
  <div :class="$style.message">
    <div :class="$style.messageTop">
      消息中心
    </div>
    <div :class="$style.messageItem">
      <div>
        <img src="/static/images/123.jpg" alt="" />
      </div>
      <div>
        <span>是心动啊</span>
        <span>上次交易的东西还在吗</span>
        <span>两天前</span>
      </div>
      <div>
        <img src="/static/images/123.jpg" alt="" />
      </div>
    </div>

    <div :class="$style.messageBottom"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // value: '',
      // to_user: '6d6e81d0-65ca-11eb-a3ab-0b952ebd2531'
    };
  },
  sockets: {
    connect() {
      // this.$socket.emit('sendPrivateMsg', '测试信息');
    }
  },
  created() {},
  mounted() {
    const { id } = this.$store.getters.getUserData;

    this.$socket.emit('login', id);
  },
  methods: {
    /**
     * @description 初始化页面
     */
    initSocket() {
      const { id } = this.$store.getters.getUserData;

      this.$socket.emit('login', id);
    },
    /**
     * @description 用socket 发消息
     */
    sendMsgBySocket() {}
  }
};
</script>
<style lang="less" module>
.message {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;

  &-top {
    text-align: center;
    height: 220px;
    line-height: 220px;
    border-bottom: 1px solid rgba(153, 153, 153, 0.5);
  }

  &-item {
    .flex;
    align-items: center;
    height: 350px;
    padding: 0 60px;
    border-bottom: 1px solid rgba(153, 153, 153, 0.5);
    > div:first-child {
      width: 200px;
      height: 200px;
      border-radius: 80px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 120px;
      }
    }

    > div:nth-child(2) {
      flex: 1;
      margin-left: 40px;
      > span {
        display: block;
        margin-bottom: 15px;
      }

      > span:first-child {
        font-size: 18px;
        font-weight: 550;
      }

      > span:nth-child(2) {
        font-size: 16px;
        color: #999;
      }

      > span:last-child {
        font-size: 14px;
        color: #999;
      }
    }

    > div:last-child {
      width: 200px;
      img {
        width: 100%;
      }
    }
  }
  &-bottom {
    width: 100%;
    position: absolute;
    bottom: 500px;
  }
}
</style>
