<template>
  <div class="userinfo">
    <div class="addbackground"></div>
    <section class="user_imfomation">
      <div class="user_imfomation_top topic">主页/</div>
      <div class="user_main">
        <img :src="user.avatar_url" alt="" />
        <span class="user_name">{{ user.loginname }}</span>
      </div>
      <div class="user_integral">{{ user.score }}积分</div>
      <div class="user_sign_at">注册时间：{{ formatDate(user.create_at) }}</div>
    </section>
    <section class="user_post">
      <div class="user_post_top topic">创建的主题</div>
      <div class="user_post_main main" v-if="user.recent_topics">
        <ul v-for="(item, index) in user.recent_topics" :key="index">
          <li>
            <router-link
              :to="{
                name: 'post_content',
                params: { id: item.id, name: item.author.loginname },
              }"
            >
              <span>{{ item.title }}</span></router-link
            >
            <span class="reply_at">{{ formatDate(item.last_reply_at) }}</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="user_replies">
      <div class="user_replies_top topic">回复的主题</div>
      <div class="user_replies_main main" v-if="user.recent_replies">
        <ul v-for="(item, index) in user.recent_replies" :key="index">
          <li>
            <router-link
              :to="{
                name: 'post_content',
                params: { id: item.id },
              }"
            >
              <span>{{ item.title }}</span></router-link
            >
            <span class="reply_at">{{ formatDate(item.last_reply_at) }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUserData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then((res) => {
          //   console.log(res);

          this.user = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount() {
    // this.isLoading = true;
    // console.log(this.user);
    this.getUserData();
  },
  computed: {
    formatDate() {
      return function (last_reply_at) {
        let date = new Date(last_reply_at);
        let time = new Date().getTime() - date.getTime();

        if (time < 0) {
          return "";
        } else if (time / 1000 < 30) {
          return "刚刚";
        } else if (time / 1000 < 60) {
          return parseInt(time / 1000) + "秒前";
        } else if (time / 60000 < 60) {
          return parseInt(time / 60000) + "分钟前";
        } else if (time / 3600000 < 24) {
          return parseInt(time / 3600000) + "小时前";
        } else if (time / 86400000 < 31) {
          return parseInt(time / 86400000) + "天前";
        } else if (time / 2592000000 < 12) {
          return parseInt(time / 2592000000) + "月前";
        } else {
          return parseInt(time / 31536000000) + "年前";
        }
      };
    },
  },
};
</script>

<style scoped>
.userinfo {
  background-color: rgb(225, 225, 225);

  height: 100vh;
}
section {
  margin: 0 auto;
  max-width: 1344px;
  background: white;
  border-radius: 3px 3px 0 0;
}
ul,
li {
  list-style: none;
}
.addbackground {
  height: 20px;
}
.user_imfomation {
  margin-bottom: 10px;
}
img {
  width: 40px;
  height: 40px;
}
.user_imfomation_top {
}
.topdetail {
  margin-left: 10px;
}
.user_main {
  position: relative;
  padding: 10px;
}
.user_name {
  position: absolute;
  top: 7px;
  margin-left: 10px;
  color: #778087;
  font-size: 14px;
}
.user_integral {
  padding-left: 10px;
  padding-bottom: 40px;
}
.user_sign_at {
  padding-left: 10px;
  padding-bottom: 10px;
}
.topic {
  color: #80bd01;
  font-size: 14px;
  height: 40px;
  border-bottom: 1px solid rgb(233, 227, 227);
  background: rgb(246, 246, 246);
  display: flex;
  align-items: center;
  border-radius: 3px 3px 3px 3px;
  padding-left: 10px;
}
.user_post_top {
  padding-left: 10px;
}
.user_replies_top {
  margin-top: 10px;
}
.main {
  padding-left: 10px;
  color: #08c;
  padding: 10px;
  position: relative;
}
li {
  margin-bottom: 10px;
}
.reply_at {
  position: absolute;
  right: 10px;
  color: #777;
  font-size: 11px;
}
a {
  text-decoration: none;
  color: #08c;
}
</style>

