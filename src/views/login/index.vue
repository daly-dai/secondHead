<template>
  <div :class="$style.login">
    <p :class="$style.loginTitle">社区二手资源交易平台</p>
    <div :class="$style.loginForm">
      <van-form
        validate-first
        label-width="30"
        @failed="onFailed"
        @submit="onSubmit"
      >
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

        <div @click="onSubmit" style="margin: 16px">
          <van-button
            color="#ffd95f"
            round
            block
            type="info"
            native-type="submit"
          >
            登录
          </van-button>
        </div>

        <span @click="routerToRigister" :class="$style.register"
          >暂无账号？前往注册</span
        >
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
        .then(res => {
          // 登录的时候对scoket进行更新
          this.$router.push({ name: ROOT_PAGE_NAME });
        })
        .catch(error => {
          console.info(error);
        });
    },
    /**
     * @description 跳转注册页面
     */
    routerToRigister() {
      this.$router.push({
        name: 'register'
      });
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    }
  }
};
</script>

<style lang="less" module>
.login {
  width: 100%;
  height: 100%;
  text-align: center;
  background: url(/static/images/login.png) no-repeat center center;
  position: relative;

  &-title {
    position: absolute;
    width: 80%;
    top: 18%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
    letter-spacing: 5px;
    font-weight: 550;
    color: #fff;
    letter-spacing: 7px;
  }

  &-form {
    position: absolute;
    width: 70%;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);

    .register {
      font-size: 14px;
      color: #4e6ef2;
      display: block;
      margin: 60px;
    }
  }
}
</style>
