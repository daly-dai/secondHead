<!--
 * @Author: your name
 * @Date: 2021-01-21 15:45:41
 * @LastEditTime: 2021-01-25 10:06:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \secondHand\src\packages\views\common-view\tab-bar.vue
-->
<template>
  <div :class="$style.bootomTab">
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
  </div>
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
          name: '发布',
          icon: 'iconfabu1',
          active: false,
          router: '/publish'
        },
        // {
        //   name: '消息',
        //   icon: 'iconxiaoxi',
        //   active: false,
        //   router: '/message'
        // },
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
<style lang="less" module>
// .bootom-tab {
//   border-top: 1px solid #999;
//   width: 100%;
//   height: 200px;
// }
.bar-icon {
  color: #fff;
}
</style>
