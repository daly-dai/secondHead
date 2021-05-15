<template>
  <div :class="$style.publish">
    <van-form @submit="onSubmit">
      <van-field
        v-model="goods.goodsname"
        name="商品名称"
        label="商品名称"
        placeholder="请输入商品名称"
        :rules="[{ required: true, message: '请填写商品价格' }]"
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
        :rules="[{ required: true, message: '请填写商品价格' }]"
      />
      <div :class="$style.uploadImg">
        <div :class="$style.uploadImgList">
          <div
            v-for="(item, index) of goods.imgs"
            :key="index"
            :class="$style.uploadImgListItem"
          >
            <div @click="deleteImg(index)"><van-icon name="clear" /></div>
            <img :src="item" alt="" />
          </div>
        </div>
        <van-uploader
          v-if="fileList.length <= 9"
          :after-read="afterRead"
          multiple
          :max-count="9"
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

      <div style="margin: 16px;">
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
import { mainMenu } from '../home/static.js';
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
        merchandiseCategory: ''
      },
      merchandiseCategory: '',
      classShow: false,
      actions: mainMenu
    };
  },
  computed: {
    ...mapGetters(['platform/getToken'])
  },
  created() {
    this.goodsId = this.$route.params.goodsId;
    this.getGoodsDetail();
  },
  methods: {
    /**
     * @description 获取商品详情数据
     */
    getGoodsDetail() {
      const params = {
        goodsId: this.goodsId
      };

      this.$api['home/getGoodsById']({ params }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.goods = res.data;

          this.merchandiseCategory = this.actions.find(
            item => item.key === this.goods.merchandiseCategory
          ).name;
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
            this.goods.imgs.push(res.data.data.path);
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
    deleteImg(index) {
      this.goods.imgs.splice(index, 1);
    },
    /**
     * @description 选择商品类别
     */
    selectMerchandise(item) {
      this.goods.merchandiseCategory = item.key;
      this.merchandiseCategory = item.name;
      this.classShow = false;
    },
    /**
     * @description 提交
     */
    onSubmit() {
      if (this.goods.imgs.length === 0) {
        Notify({ type: 'warning', message: '上传图片不能为空' });
        return false;
      }

      const data = {
        ...this.goods,
        goodsId: this.goodsId,
        imgs: this.goods.imgs.join(',')
      };

      this.$api['personal/updateGoodsMsg']({ data }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          Notify({ type: 'success', message: '商品编辑成功' });
          this.getGoodsDetail();
        }
      });
    }
  }
};
</script>

<style lang="less" module>
.publish {
  padding-top: 30px;

  .upload-img {
    background: #fff;
    padding: 0 16px;

    &-list {
      margin: 20px;
      .flex;
      &-item {
        width: 20%;
        position: relative;
        margin-right: 30px;
        > div:first-child {
          position: absolute;
          right: 0;
          top: 0;
        }
        img {
          width: 100%;
        }
      }
    }
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
</style>
