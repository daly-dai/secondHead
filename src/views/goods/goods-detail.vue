<template>
  <div :class="$style.detail">
    <div :class="$style.detailTop">
      <div :class="$style.userImg">
        <img :src="goodsData.avatar" alt="" />
      </div>
      <div>{{ goodsData.goodsname }}</div>
    </div>
    <p :class="$style.detailPrice">￥{{ goodsData.price }}</p>
    <div :class="$style.detailDesc">
      {{ goodsData.desc }}
    </div>
    <div :class="$style.detailImgs">
      <div
        v-for="(item, index) of goodsData.imgs"
        :key="index"
        :class="$style.detailImgsItem"
      >
        <img :src="item" alt="" />
      </div>
    </div>
    <div :class="$style.detailLeaveMessage">
      <p>全部留言</p>
      <div :class="$style.message">
        <van-field
          v-model="message"
          center
          clearable
          label="留言"
          placeholder="请输入留言信息"
        >
          <template #button>
            <van-button type="primary" @click="sendGoodsReply">发送</van-button>
          </template>
        </van-field>

        <div
          :class="$style.messageItem"
          v-for="(item, index) of messageList"
          :key="index"
        >
          <div :class="$style.messageItemTop">
            <div :class="$style.messageItemTopAvatar">
              <img :src="item.user.avatar" alt="" />
            </div>
            <p>{{ item.user.name }}</p>
          </div>

          <div :class="$style.messageItemDesc">{{ item.desc }}</div>
          <div :class="$style.messageItemTime">{{ formatDate(item.date) }}</div>
        </div>
      </div>
    </div>
    <div
      v-if="reWatch === 0"
      :class="$style.detailBottom"
      @click="routerConfirm"
    >
      我想要
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { Notify } from 'vant';
export default {
  data() {
    return {
      goodsData: {},
      reWatch: 0,
      message: '',
      messageList: []
    };
  },
  created() {
    this.reWatch = this.$route.params.reWatch || 0;
    this.getGoodsDetail();
    this.getReplyList();
  },
  methods: {
    ...mapActions(['goods/updateGoodsId']),
    /**
     * @description 获取商品详情数据
     */
    getGoodsDetail() {
      const params = {
        goodsId: this.$route.params.id
      };

      this.$api['home/getGoodsById']({ params }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.goodsData = res.data;
        }
      });
    },
    routerConfirm() {
      this['goods/updateGoodsId'](this.$route.params.id);

      this.$router.push({
        name: 'goods-confirm'
      });
    },
    /**
     * @description 获取商品用户额留言
     */
    getReplyList() {
      const params = {
        goods: this.$route.params.id
      };

      this.$api['home/getReplyList']({ params }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.messageList = res.data;
        }
      });
      return false;
    },
    /**
     * @description 发送商品留言
     */
    sendGoodsReply() {
      if (!this.message) {
        Notify({ type: 'warning', message: '发送内容不能为空' });
        return false;
      }

      console.log(this.$route.params.id, 66666);
      const data = {
        goods: this.$route.params.id,
        desc: this.message
      };

      this.$api['home/addGoodsReply']({ data }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          Notify({ type: 'success', message: '留言成功' });
          this.message = '';
          this.getReplyList();
        }
      });
    },
    formatDate(value) {
      const date = new Date(value);
      const y = date.getFullYear();
      let MM = date.getMonth() + 1;

      MM = MM < 10 ? '0' + MM : MM;
      let d = date.getDate();
      d = d < 10 ? '0' + d : d;
      let h = date.getHours();
      h = h < 10 ? '0' + h : h;
      let m = date.getMinutes();
      m = m < 10 ? '0' + m : m;
      let s = date.getSeconds();
      s = s < 10 ? '0' + s : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  }
};
</script>
<style lang="less" module>
.detail {
  background: #fff;
  padding: 30px;
  padding-bottom: 240px;
  height: 100%;

  &-top {
    .flex;
    align-items: center;
    padding: 20px 0 50px;
    border-bottom: 1px solid rgba(153, 153, 153, 0.3);

    .user-img {
      width: 3em;
      height: 3em;
      // background: #999;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  &-imgs {
    margin-top: 30px;
    &-item {
      width: 80%;
      text-align: center;
      margin: 0 auto;
      margin-top: 40px;
      img {
        width: 100%;
      }
    }
  }

  &-price {
    color: red;
    font-weight: 550;
    font-size: 18px;
  }

  &-desc {
    padding: 0 30px;
  }

  &-leave-message {
    margin-top: 60px;
    border-top: 3px solid hsla(0, 0%, 60%, 0.3);

    .message-item {
      margin: 60px;
      &-top {
        .flex;
        &-avatar {
          width: 200px;
          height: 200px;
          img {
            width: 100%;
            display: inline-block;
            border-radius: 55%;
          }
        }
      }

      &-desc {
        margin-left: 260px;
      }

      &-time {
        margin-top: 30px;
        margin-left: 260px;
        color: #999;
        font-size: 14px;
      }
    }
  }

  &-bottom {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
    height: 240px;
    line-height: 240px;
    background: rgb(247, 115, 115, 1);
    font-size: 18px;
    letter-spacing: 10px;
    font-weight: 550;
    color: #fff;
  }
}
</style>
