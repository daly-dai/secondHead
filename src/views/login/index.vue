<template>
  <div :class="$style.login">
    <div :class="$style.loginForm">
      <van-form validate-first label-width="30" @failed="onFailed" @submit="onSubmit">
        <van-field
          v-model="email"
          name="邮箱"
          label="邮箱"
          placeholder="admin"
          :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="admin or super"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button color="#ffd95f" round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { ROOT_PAGE_NAME } from '@config/index.js';
import { mapActions } from 'vuex';
// import md5 from 'js-md5';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['platform/handleLogin']),
    onSubmit() {
      this['platform/handleLogin']({
        email: this.email,
        password: this.password
      })
        .then((resData) => {
          this.$router.push({ name: ROOT_PAGE_NAME });
        })
        .catch((error) => {
          console.info(error);
        });
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    }
  }
};
</script>

<style lang="less"  module>
.login {
  width: 100%;
  height: 100%;
  text-align: center;
  background: url(/static/images/login.png) no-repeat center center;
  position: relative;

  &-form {
    position: absolute;
    width: 70%;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
