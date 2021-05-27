<template>
  <div :class="$style.edit">
    <van-cell-group>
      <van-cell title="头像">
        <template #right-icon>
          <van-uploader
            :after-read="afterRead"
            :max-count="1"
            v-model="uploader"
            @delete="deleteImg"
          />
        </template>
      </van-cell>
      <van-field
        v-model="userData.email"
        name="邮箱"
        label="邮箱"
        placeholder="请输入邮箱"
        autocomplete="off"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field
        v-model="userData.name"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        autocomplete="off"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="userData.password"
        type="password"
        label="密码"
        autocomplete="new-password"
        placeholder="请输入密码"
      />
      <van-field
        v-model="userData.password2"
        type="password"
        label="确认密码"
        autocomplete="new-password"
        placeholder="请输入密码"
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

      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="userData.sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <div :class="$style.button">
        <van-button
          @click="registerUserData"
          color="#ffd95f"
          round
          block
          type="info"
          native-type="submit"
          >注册</van-button
        >
      </div>
    </van-cell-group>
  </div>
</template>
<script>
import { Notify } from 'vant';
import { LOGIN_PAGE_NAME } from '@config/index.js';
export default {
  data() {
    return {
      userData: {
        email: '',
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
    this.getCommunity();
  },
  methods: {
    /**
     * @description 获取社区列表
     */
    getCommunity() {
      this.$api['user/getCommunity']().then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.communityList = res.data.map(item => {
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
            this.userData.avatar = res.data.data.path;
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
     * @description 注册用户信息
     */
    registerUserData() {
      for (const key in this.userData) {
        if (!this.userData[key]) {
          Notify({ type: 'warning', message: '还有必填信息未填' });
          return false;
        }
      }

      if (this.userData.password !== this.userData.password2) {
        Notify({ type: 'warning', message: '两次输入密码不一致' });
        return false;
      }

      const data = { ...this.userData };

      this.$api['login/register']({ data }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          Notify({ type: 'success', message: '注册成功' });
          this.$router.push({
            name: LOGIN_PAGE_NAME
          });
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
  padding-top: 60px;

  // &-title {
  //   text-align: center;
  //   margin-bottom: 40px;
  //   padding-top: 40px;
  // }

  .user-avatar {
    width: 350px;
    height: 350px;
    border-radius: 55%;
    margin-right: 20px;
    border: 1px solid #fff;
  }

  .button {
    width: 80%;
    margin: 0 auto;
    margin-top: 10%;
  }
}
</style>
