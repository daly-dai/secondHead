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
    <div :class="$style.messageBottom">
      <van-field v-model="value" label="输入框" placeholder="请输入用户名" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    };
  },
  created() {},
  mounted() {
    // eslint-disable-next-line no-undef
    const loginId = this.$store.getters.getUserData;
    console.log(loginId, 6767);
    this.$socket.emit('login', loginId);
  },
  methods: {
    /**
     * @description 初始化页面
     */
    initSocket() {
      // eslint-disable-next-line no-undef
      // this.$socket.emit('login', loginId);
    },
    /**
     * @description 用socket 发消息
     */
    sendMsgBySocket() {}
  }
};
</script>
<style lang='less' module>
.message {
  position: relative;
  width: 100%;
  height: 100%;
  &-bottom {
    width: 100%;
    position: absolute;
    bottom: 120px;
  }
}
</style>
