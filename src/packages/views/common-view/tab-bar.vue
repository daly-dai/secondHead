<template>
  <van-tabbar route v-model="active">
    <van-tabbar-item
      v-for="(item, index) of bottomList"
      :key="index"
      :to="item.router"
      :icon="item.icon"
    >
      {{ item.name }}
      <template slot="icon">
        <base-svg-icon
          :class="$style.barIcon"
          :iconName="item.icon"
        ></base-svg-icon>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      bottomList: [
        {
          name: '首页',
          icon: 'iconshouye',
          active: false,
          router: '/'
        },
        {
          name: '社区',
          icon: 'iconshequ',
          active: false,
          router: '/community'
        },
        {
          name: '发布',
          icon: 'iconplus',
          active: false,
          router: '/publish'
        },
        {
          name: '消息',
          icon: 'iconxiaoxi',
          active: false,
          router: '/message'
        },
        {
          name: '我的',
          icon: 'iconwode',
          active: false,
          router: '/personal'
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang='less' module>
</style>
