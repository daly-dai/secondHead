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
  methods: {
    /**
     * @description 初始化页面
     */
    initSocket() {},
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
