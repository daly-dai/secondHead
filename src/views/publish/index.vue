<template>
  <div :class="$style.publish">
    <van-form @submit="onSubmit">
      <van-field
        v-model="goods.goodsname"
        name="商品名称"
        label="商品名称"
        placeholder="请输入商品名称"
        :rules="[{ required: true, message: '请输入商品名称' }]"
      />
      <van-field
        v-model="goods.desc"
        rows="3"
        type="textarea"
        show-word-limit
        maxlength="300"
        name="商品描述"
        label="商品描述"
        placeholder="请输入商品描述"
        :rules="[{ required: true, message: '请输入商品描述' }]"
      />
      <div :class="$style.uploadImg">
        <van-uploader
          v-if="fileList.length <= 9"
          v-model="fileList"
          :after-read="afterRead"
          multiple
          :max-count="9"
          @delete="deleteImg"
        />
      </div>
      <van-field
        v-model="goods.price"
        name="商品价格"
        label="商品价格"
        type="number"
        placeholder="请输入商品价格"
        :rules="[{ required: true, message: '请填写商品价格' }]"
      />
      <div :class="$style.attritionrate">
        <span>磨损程度</span>
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="goods.attritionrate"
            :options="option"
          ></van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <van-field
        v-model="merchandiseCategory"
        name="商品类别"
        label="商品类别"
        placeholder="请输入商品类别"
        readonly
        @focus="classShow = true"
        :rules="[{ required: true, message: '请填写商品类别' }]"
      />
      <van-action-sheet
        v-model="classShow"
        :actions="actions"
        cancel-text="取消"
        @select="selectMerchandise"
        close-on-click-action
      />

      <div style="margin: 30px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { Notify } from 'vant';
export default {
  data() {
    return {
      // 图片上传
      fileList: [],
      uploadFileList: [],
      goods: {
        goodsname: '',
        imgs: '',
        price: '',
        desc: '',
        attritionrate: '',
        merchandiseCategory: '',
        sellername: ''
      },
      merchandiseCategory: '',
      classShow: false,
      actions: [],
      option: [
        { text: '几乎全新', value: '几乎全新' },
        { text: '轻微使用', value: '轻微使用' },
        { text: '明显使用痕迹', value: '明显使用痕迹' }
      ]
    };
  },
  computed: {
    ...mapGetters(['platform/getToken'])
  },
  created() {
    this.getMerchandiseCategory();
  },
  methods: {
    /**
     * @description 获取所有的商品分类
     */
    getMerchandiseCategory() {
      this.$api['publish/getMerchandiseCategory']().then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.actions = res.data;
        }
      });
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
            this.uploadFileList.push(res.data.data.path);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @description 保存图片
     */
    saveImg() {
      if (this.uploadFileList.length === 0) {
        Notify({ type: 'warning', message: '上传图片不能为空' });
        return false;
      }

      this.show = false;
    },
    /**
     * @description 删除图片
     */
    deleteImg(imgObj, detail) {
      this.uploadFileList.splice(detail.index, 1);
    },
    /**
     * @description 选择商品类别
     */
    selectMerchandise(item) {
      this.goods.merchandiseCategory = item._id;
      this.merchandiseCategory = item.name;
      this.classShow = false;
    },
    /**
     * @description 提交
     */
    onSubmit() {
      if (this.uploadFileList.length === 0) {
        Notify({ type: 'warning', message: '上传图片不能为空' });
        return false;
      }
      const userData = this.$store.getters['platform/getData'];

      const data = {
        ...this.goods,
        sellername: userData.name,
        avatar: userData.avatar,
        community: userData.community,
        imgs: this.uploadFileList.join(',')
      };

      this.$api['publish/addGoods']({ data }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          Notify({ type: 'success', message: '商品新增成功' });
          this.initGoodsData();
        }
      });
    },
    /**
     * @description 清空商品相关数据
     */
    initGoodsData() {
      Object.keys(this.goods).map(item => {
        this.goods[item] = '';
      });

      this.fileList = [];
      this.uploadFileList = [];
      this.merchandiseCategory = '';
    }
  }
};
</script>

<style lang="less" module>
.publish {
  .full-y;
  padding-top: 60px;
  background: #fff;

  .upload-img {
    background: #fff;
    padding: 0 16px;
  }
}
.upload {
  background: #fff;
  padding: 40px;
  width: 80%;
  min-height: 40%;
  margin: 0 auto;
  position: fixed;
  bottom: 30%;
  left: 50%;
  transform: translate(-50%);

  /deep/ .van-uploader__upload {
    margin: 0;
  }

  .confirm {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
  }
}

.attritionrate {
  position: relative;
  > span {
    position: absolute;
    left: 60px;
    font-size: 14px;
    z-index: 120;
    color: #666;
    top: 80px;
  }
}
</style>
