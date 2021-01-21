<template>
  <div>
    <div :class="$style.bottom"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bottomList: [
        {
          name: '首页',
          icon: 'iconshouye',
          active: false,
          router: ''
        },
        {
          name: '社区',
          icon: '',
          active: false,
          router: ''
        },
        {
          name: '发布',
          icon: '',
          active: false,
          router: ''
        },
        {
          name: '消息',
          icon: '',
          active: false,
          router: ''
        },
        {
          name: '我的',
          icon: '',
          active: false,
          router: ''
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
