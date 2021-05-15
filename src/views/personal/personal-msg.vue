<template>
  <div :class="$style.msg">
    <van-cell title="个人资料设置" is-link url="personal-edit" />
    <div @click="confirmLogOut" :class="$style.msgButton">
      退出登录
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { Dialog, Notify } from 'vant';
import { LOGIN_PAGE_NAME } from '@config/index.js';
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    ...mapActions(['platform/handleExit']),
    /**
     * @description 确认退出登录
     */
    confirmLogOut() {
      Dialog.alert({
        title: '退出登录',
        message: '是否退出登录',
        theme: 'round-button'
      }).then(() => {
        this.logOut();
      });
    },
    /**
     * @description 取消登录
     */
    logOut() {
      this['platform/handleExit']({
        email: this.email,
        password: this.password
      })
        .then(res => {
          Notify({ type: 'success', message: '退出成功' });
          this.$router.push({
            name: LOGIN_PAGE_NAME
          });
        })
        .catch(error => {
          console.info(error);
        });
    }
  }
};
</script>
<style lang="less" module>
.msg {
  .full-y;
  position: relative;
  &-button {
    text-align: center;
    width: 90%;
    margin: 20% auto;
    background: red;
    padding: 80px 0;
    color: #fff;
    border-radius: 60px;
    font-size: 16px;
  }
}
</style>
