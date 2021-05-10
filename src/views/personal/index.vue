<template>
  <div :class="$style.person">
    <div :class="$style.personTop">
      <base-svg-icon
        iconName="iconshezhi"
        :cls="$style.personConfig"
      ></base-svg-icon>
    </div>
    <div :class="$style.personHead">
      <div>
        <img :src="userImage" alt="" />
      </div>
      <p>{{ userName }}</p>
    </div>
    <p :class="$style.personName">我的交易</p>
    <div :class="$style.personGoods">
      <div>
        <base-svg-icon iconName="iconfabu1"></base-svg-icon>
        <p>已发布</p>
      </div>
      <div>
        <base-svg-icon iconName="iconfukuan"></base-svg-icon>
        <p>我卖出的</p>
      </div>
      <div>
        <base-svg-icon iconName="iconxinyongka"></base-svg-icon>
        <p>我买到的</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      userImage: ''
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      const data = this.$store.getters['platform/getData'];

      this.userName = data.name;
      this.userImage = data.avatar;
    }
  }
};
</script>

<style lang="less" module>
.person {
  .full-y;
  &-top {
    background: url('/static/images/homeBg.png') no-repeat;
    background-size: 100%;
    .flex;
    justify-content: flex-end;
    padding: 20px 70px;

    .person-config {
      font-size: 20px;
    }
  }

  &-head {
    background: url('/static/images/homeBg.png') no-repeat;
    background-size: 100%;
    height: 20%;
    padding: 50px 0;
    text-align: center;
    > div {
      width: 380px;
      height: 380px;
      border-radius: 55%;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        border-radius: 55%;
      }
    }
  }

  &-name {
    // padding-left: 40px;
    margin: 0;
    padding: 60px;
    background: #fff;
  }

  &-goods {
    background: #fff;
    .flex;
    > div {
      text-align: center;
      flex: 1;
    }
  }
}
</style>
