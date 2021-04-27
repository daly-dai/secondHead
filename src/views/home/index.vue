<template>
  <div :class="$style.home">
    <div :class="$style.homeHead">
      <div>
        <span>易趣</span>
      </div>
      <div :class="$style.homeInput">
        <input type="text" />
      </div>
      <div>
        <span>分类</span>
      </div>
    </div>
    <div :class="$style.homeCenter">
      <div :class="$style.centerClass">
        <div
          :class="$style.centerClassItem"
          v-for="(item, index) of classList"
          :key="index"
        >
          <i></i>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div :class="$style.homeBottom">
      <span>猜您喜欢</span>
    </div>
    <van-popup v-model="show">内容</van-popup>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      show: false,
      classList: [
        {
          name: '数码',
          icon: 'iconxiangji',
          url: '',
          key: ''
        },
        {
          name: '图书',
          icon: 'iconyouhuiquan',
          url: '',
          key: ''
        },
        {
          name: '游戏',
          icon: 'iconyouxi',
          url: '',
          key: ''
        },
        {
          name: '体育',
          icon: 'iconyundong',
          url: '',
          key: ''
        },
        {
          name: '母婴用品',
          icon: 'iconmuyingwanju',
          url: '',
          key: ''
        },
        {
          name: '特价零食',
          icon: 'iconpisa',
          url: '',
          key: ''
        },
        {
          name: '交通工具',
          icon: 'iconCar',
          url: '',
          key: ''
        },
        {
          name: '鞋帽服饰',
          icon: 'iconzhuangbei',
          url: '',
          key: ''
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" module>
.home {
  padding: 40px 60px;
  &-head {
    display: flex;
    > div:first-child,
    > div:last-child {
      width: 240px;
    }

    .home-input {
      flex: 1;
      input {
        width: 80%;
        margin: 0 auto;
        display: inline-block;
      }
    }
  }
}
</style>
