<template>
  <!--  私聊 -->
  <div class="wrapper">
    <ul>
      <li v-for="(item, index) in privateDetail" :key="index">
        <ChatItem
          v-if="fromUserInfo.user_id === item.from_user"
          :href="item.from_user"
          :img="item.avator"
          me="true"
          :msg="item.message"
          :name="item.name"
          :time="item.time"
        ></ChatItem>
        <ChatItem
          v-else
          :img="item.avator"
          :msg="item.message"
          :href="item.from_user"
          :name="item.name"
          :time="item.time"
        ></ChatItem>
      </li>
    </ul>
    <div class="input-msg">
      <textarea
        v-model="inputMsg"
        @keydown.enter.prevent="sendMessage"
        ref="message"
      ></textarea>
      <p class="btn" :class="{ enable: inputMsg != '' }" @click="sendMessage">
        {{ btnInfo }}
      </p>
    </div>
  </div>
</template>

<script>
import ChatItem from './ChatItem.vue';
import axios from 'axios';
// import { toNomalTime } from '../utils/transformTime';
import { mapGetters } from 'vuex';
export default {
  components: {
    ChatItem
  },

  data() {
    return {
      inputMsg: '',
      privateDetail: [], // 私聊相关
      toUserInfo: {
        // 被私聊者
        to: '',
        avator: '',
        sex: '',
        place: '',
        status: ''
      },
      fromUserInfo: {}, // 用户自己
      btnInfo: '发送'
    };
  },

  computed: {
    ...mapGetters(['platform/getUserData'])
  },

  watch: {
    privateDetail() {
      this.refresh();
    }
  },
  created() {
    // 获取聊天者的用户id
    // this.toUserInfo.to_user = this.$route.params.user_id;
    this.toUserInfo.to = '6083b1e93fdadc2ce4c2252f';
    // 获取自己的用户信息
    this.fromUserInfo = this['platform/getUserData'];
    // this.resetUnred();
    this.getPrivateMsg();
    this.getMsgBySocket();
    this.$store.dispatch('someOneInfoAction', this.toUserInfo.to_user);
  },
  methods: {
    toNomalTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const Y = date.getFullYear() + '-';
      const M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-';
      const D = date.getDate() + ' ';
      const h = date.getHours() + ':';
      const m = date.getMinutes();
      return Y + M + D + h + m;
    },
    // 获取数据库的消息
    getPrivateMsg() {
      // axios
      //   .get('/api/v1/private_detail', {
      //     params: {
      //       to_user: this.toUserInfo.to_user
      //       // from_user: this.fromUserInfo.user_id
      //     }
      //   })
      //   .then(res => {
      //     console.log('res222', res);
      //     if (res.data.success) {
      //       this.privateDetail = res.data.data.privateDetail;
      //       if (this.privateDetail.length === 0) return;
      //       this.privateDetail.forEach(element => {
      //         element.time = this.toNomalTime(element.time);
      //         element.message = element.message.split(':')[1];
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     const errorMsg = err.response.data.error;
      //     this.$message({
      //       message: errorMsg,
      //       type: 'error'
      //     });
      //   });
    },
    // 发送信息
    sendMessage() {
      if (this.inputMsg.trim() === '') return;

      this.sendMsgBySocket();
      this.saveMsgByDB();
    },
    // 用socket发消息
    sendMsgBySocket() {
      const data = {
        from: this.fromUserInfo.id, // 自己的id
        to: this.toUserInfo.to_user, // 对方id
        name: this.fromUserInfo.name, // 自己的昵称
        avatar: this.fromUserInfo.avatar, // 自己的头像
        message: this.inputMsg, // 消息内容
        status: '1', // 是否在线 0为不在线 1为在线
        time: Date.parse(new Date()) / 1000 // 时间
      };
      this.$socket.emit('sendPrivateMsg', data);
      // this.$store.commit('updateListMutation', data);
    },
    // 用数据库存消息
    saveMsgByDB() {
      const data = {
        from_user: this.fromUserInfo.user_id, // 自己的id
        to_user: this.toUserInfo.to_user, // 对方的id
        name: this.fromUserInfo.name, // 自己的昵称
        avator: this.fromUserInfo.avator, // 自己的头像
        message: this.inputMsg, // 消息内容
        status: '1', // 是否在线 0为不在线 1为在线
        time: Date.parse(new Date()) / 1000 // 时间
      };
      // 存此条私聊信息到数据库
      axios.post('/api/v1/private_save_msg', data).then(res => {
        this.inputMsg = '';
        // 存此条私聊信息到本地
        data.time = this.toNomalTime(data.time);
        console.log('saveMsgByDBdata', data);
        this.privateDetail.push(data);
      });
    },
    // 获取socket消息
    getMsgBySocket() {
      // 清空其他页面的监听事件
      this.$socket.removeAllListeners('getPrivateMsg');
      // 重新添加监听事件
      this.$socket.on('getPrivateMsg', data => {
        console.log(data);
        console.log('聊天内获取私聊消息', data);
        // 如果收到的soket信息不是发给自己的 放弃这条soket 没必要了 因为私聊是点对点发送的
        // 如果收到的soket信息不是来自当前聊天者 写入首页信息列表 并return

        // soket信息不是来自当前聊天者 vuex添加此条信息 有未读提示
        if (data.from_user !== this.toUserInfo.to) {
          console.log(data, 'updateListMutationdata');
          data.chatOfNow = false;
          this.$store.commit('updateListMutation', data);
          return;
        } else {
          // soket信息来自当前聊天者 vuex添加此条信息 没未读提示
          data.chatOfNow = true;
          this.$store.commit('updateListMutation', data);
        }
        // 本地添加此条信息
        this.privateDetail.push(data);
      });
    },

    // 将未读信息归零
    resetUnred() {
      this.$store.commit('resetUnredMutation', this.toUserInfo.to_user);
    },
    // 消息置底
    refresh() {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight + 10000);
      }, 0);
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  // height: 100vh;
  padding-top: 0.6rem;
  z-index: 1;

  ul {
    width: 100%;
    padding-bottom: 1.6rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;

    li {
      list-style-type: none;
    }
  }

  .input-msg {
    height: 0.46rem;
    position: fixed;
    bottom: 0.03rem;
    display: flex;
    display: -webkit-flex;
    /* Safari */
    width: 100%;
    z-index: 999;

    textarea {
      width: 87.8%;
      margin: 0 0.06rem;
      padding-top: 0.07rem;
      padding-left: 0.06rem;
      border-radius: 0.02rem;
      outline: none;
      resize: none;
      border: none;
      overflow-y: hidden;
      font: 0.16rem/0.18rem 'Microsoft Yahei';
    }

    p.btn {
      font-size: 0.2rem;
      display: flex;
      display: -webkit-flex;
      /* Safari */
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-right: 0.06rem;
      height: 100%;
      width: 11%;
      background: #ccc;
      color: white;
      border-radius: 0.02rem;
      cursor: not-allowed;
      font-family: 'Microsoft Yahei';

      &.enable {
        background: #1e90ff;
        cursor: pointer;
      }
    }
  }
}
</style>
