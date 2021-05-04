<template>
  <div>
    <van-uploader :after-read="afterRead" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['platform/getToken'])
  },
  created() {},
  methods: {
    // 上传图片
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);

      const fd = new FormData();
      const fileObj = file.file;
      fd.append('file', fileObj);

      this.$axios({
        method: 'post',
        url: 'public/upload', // 分析接口
        baseURL: '/api',
        data: fd,
        headers: { Authorization: this['platform/getToken'] }
      })
        .then(res => {
          if (res.data.code === this.$constant.apiServeCode.SUCCESS_CODE) {
            this.uploadStatus = 'success';
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" module></style>
