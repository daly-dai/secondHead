<template>
  <div :class="$style.edit">
    <van-cell-group>
      <van-cell title="头像">
        <template #right-icon>
          <img
            :class="$style.userAvatar"
            v-if="uploader.length === 0"
            :src="userData.avatar"
            alt=""
          />

          <van-uploader
            :after-read="afterRead"
            :max-count="1"
            v-model="uploader"
            @delete="deleteImg"
          />
        </template>
      </van-cell>
      <van-field
        v-model="userData.name"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        autocomplete="off"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="community"
        name="社区"
        label="社区"
        placeholder="请选择社区"
        readonly
        @focus="classShow = true"
        :rules="[{ required: true, message: '请选择社区' }]"
      />
      <van-action-sheet
        v-model="classShow"
        :actions="communityList"
        cancel-text="取消"
        @select="selectMerchandise"
        close-on-click-action
      />

      <van-field name="radio" label="单选框">
        <template #input>
          <van-radio-group v-model="userData.sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <div :class="$style.button" style="margin: 16px;">
        <van-button
          @click="editUserData"
          round
          block
          type="info"
          native-type="submit"
          >提交</van-button
        >
      </div>
    </van-cell-group>
  </div>
</template>
<script>
import { Notify } from 'vant';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      userData: {
        avatar: '',
        name: '',
        community: '',
        sex: 1
      },
      avatar: '',
      classShow: false,
      uploader: [],
      communityList: [],
      community: ''
    };
  },
  created() {
    this.initPage();
    this.getCommunity();
  },
  methods: {
    ...mapActions(['platform/updateData']),
    /**
     * @description 初始化页面
     */
    initPage() {
      this.stashUserData = this.$store.getters['platform/getData'];

      Object.keys(this.userData).map(key => {
        if (this.stashUserData[key]) {
          this.userData[key] = this.stashUserData[key];
        }
      });
    },
    /**
     * @description 获取社区列表
     */
    getCommunity() {
      this.$api['user/getCommunity']().then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.communityList = res.data.map(item => {
            if (this.stashUserData.community === item._id) {
              this.community = item.name;
            }

            return {
              name: item.name,
              key: item._id
            };
          });
        }
      });
    },
    /**
     * @description 选择社区
     */
    selectMerchandise(item) {
      this.userData.community = item.key;
      this.community = item.name;
      this.classShow = false;
    },
    /**
     * @description 上传图片
     */
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
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
            this.avatar = res.data.data.path;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @description 删除图片
     */
    deleteImg(imgObj, detail) {
      this.uploader = [];
      this.avatar = '';
    },
    /**
     * @description 更新用户信息
     */
    editUserData() {
      for (const key in this.userData) {
        if (!this.userData[key] && key !== 'avatar') {
          Notify({ type: 'warning', message: '还有必填信息未填' });
          console.log(key);
          return false;
        }
      }

      const data = { ...this.userData };
      if (this.avatar) {
        data.avatar = this.avatar;
      }

      this.$api['user/editUserData']({ data }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          const data = res.data;

          Object.keys(this.userData).map(key => {
            this.stashUserData[key] = data[key];
          });

          this.$store.dispatch('platform/updateData', {
            data: { ...this.stashUserData }
          });

          this.$store.dispatch('setUserData', {
            data: { ...this.stashUserData }
          });

          Notify({ type: 'success', message: '更新成功' });

          this.initPage();
        }
      });
    }
  }
};
</script>
<style lang="less" module>
.edit {
  .full-y;
  background: #fff;

  .user-avatar {
    width: 350px;
    height: 350px;
    border-radius: 55%;
    margin-right: 20px;
    border: 1px solid #fff;
  }

  .button {
    margin-top: 5%;
  }
}
</style>
