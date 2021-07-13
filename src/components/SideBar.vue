<template>
  <div class="sidebar">
    <div class="author">
      <div class="top">作者</div>
      <div class="author_infomation">
        <router-link
          :to="{
            name: 'user_info',
            params: { name: user.loginname },
          }"
        >
          <img :src="user.avatar_url" alt="" />
          <span class="author_name"> {{ user.loginname }} </span>
        </router-link>
      </div>
      <div class="score">{{ user.score }}积分</div>
    </div>
    <div class="author_recent_topic">
      <div class="top">作者最近主题</div>
      <div class="recent_topic">
        <ul v-for="(item, index) in topcilimitby5" :key="index">
          <li class="details">
            <router-link
              :to="{
                name: 'post_content',
                params: { id: item.id, name: item.author.loginname },
              }"
            >
              {{ item.title }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="author_recent_replies">
      <div class="top">作者最近回复</div>
      <div class="recent_replies">
        <ul v-for="(item, index) in replylimitby5" :key="index">
          <li class="details">
            <router-link
              :to="{
                name: 'post_content',
                params: { id: item.id, name: item.author.loginname },
              }"
            >
              {{ item.title }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
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
    topcilimitby5() {
      if (this.user.recent_topics) {
        return this.user.recent_topics.slice(0, 5);
      }
    },
    replylimitby5() {
      if (this.user.recent_replies) {
        return this.user.recent_replies.slice(0, 5);
      }
    },
  },
};
</script>

<style  scoped>
.sidebar {
  width: 328px;
  float: right;
  margin-top: 15px;
}
.top {
  font-size: 14px;
  height: 40px;
  border-bottom: 1px solid rgb(233, 227, 227);
  background: rgb(246, 246, 246);
  display: flex;
  align-items: center;
  border-radius: 3px 3px 0px 0px;
  padding-left: 10px;
}
img {
  height: 70px;
  width: 70px;
  padding: 10px;
}
.author {
  background: white;
}
.author_infomation {
  padding: 10px;
}
.score {
  padding-left: 20px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 14px;
}
a {
  text-decoration: none;
  color: #778087;
  font-size: 14px;
}
.author_name {
  position: relative;
  top: -30px;
}
ul,
li {
  list-style: none;
}
.recent_topic,
.recent_replies {
  background: white;
}
.details {
  padding: 10px;
  border-bottom: 1px solid rgb(233, 227, 227);
}
</style>
