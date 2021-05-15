<template>
  <div :class="$style.person">
    <div :class="$style.personTop">
      <div @click="routerToEdit">
        <base-svg-icon
          iconName="iconshezhi"
          :cls="$style.personConfig"
        ></base-svg-icon>
      </div>
    </div>
    <div :class="$style.personHead">
      <div>
        <img :src="userImage" alt="" />
      </div>
      <p>{{ userName }}</p>
    </div>
    <p :class="$style.personName">我的交易</p>
    <div :class="$style.personGoods">
      <div
        @click="routerDetail(item.path)"
        v-for="(item, index) of routerList"
        :key="index"
      >
        <base-svg-icon
          :cls="$style.personIcon"
          :iconName="item.icon"
        ></base-svg-icon>
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      userImage: '',
      routerList: [
        {
          name: '已发布',
          icon: 'iconfabu1',
          path: 'goods-published'
        },
        {
          name: '已卖出的',
          icon: 'iconfukuan',
          path: 'goods-saled'
        },
        {
          name: '已买到的',
          icon: 'iconxinyongka',
          path: 'goods-buyered'
        }
      ]
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
    },
    /**
     * @description 跳转到详情页
     * @param {string } 路径
     */
    routerDetail(path) {
      this.$router.push({
        name: path
      });
    },
    /**
     * @description 跳转到信息配置页面
     */
    routerToEdit() {
      console.log(999999);
      this.$router.push({
        name: 'personal-msg'
      });
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

      .person-icon {
        font-size: 28px;
      }
    }
  }
}
</style>
