<template>
  <div id="app">
    <navbar v-if="navbarVisible" />
    <base-route-view
      :keep-alive="false"
      :key="$route.fullPath"
    ></base-route-view>
    <tab-bar v-if="tabbarVisible" />
  </div>
</template>

<script>
import tabBar from '@packages/views/common-view/tab-bar.vue';

export default {
  components: {
    tabBar
  },
  computed: {
    navbarVisible() {
      const { meta } = this.$route;

      return meta && meta.navbarVisible;
    },
    tabbarVisible() {
      const { meta } = this.$route;

      return meta && meta.tabbarVisible;
    }
  }
};
</script>

<style lang="less">
#app {
}
</style>
