<template>
  <div :class="layout">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  components: {},

  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang='less' module>
.layout {
  position: relative;
}
</style>
