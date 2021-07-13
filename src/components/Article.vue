<template>
  <div class="article_background">
    <div class="add_background"></div>
    <div class="article">
      <!-- <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div> -->
      <div>
        <header>
          <div class="article_title">{{ post.title }}</div>
          <span class="infomation"
            >●发布于:{{ formatDate(post.create_at) }}</span
          >
          <span class="infomation" v-if="post.author"
            >●作者：{{ post.author.loginname }}</span
          >
          <span class="infomation">●{{ post.visit_count }}次浏览</span>
          <span class="infomation">●来自{{ tabFormatter(post) }}</span>
        </header>
        <main>
          <div v-html="post.content" class="content"></div>
          <div class="reply">
            <div class="toptitle">回复</div>
            <div
              class="reply_"
              v-for="(reply, index) in post.replies"
              :key="index"
            >
              <div class="reply_top">
                <router-link
                  :to="{
                    name: 'user_info',
                    params: { name: reply.author.loginname },
                  }"
                >
                  <img
                    class="reply_img"
                    :src="reply.author.avatar_url"
                    alt=""
                  />
                  <span class="reply_name" v-if="reply.author">{{
                    reply.author.loginname
                  }}</span></router-link
                >
                <span class="reply_floor"> {{ index + 1 }}楼 </span>
                <span class="reply_up" v-if="reply.ups.length > 0">
                  👍 {{ reply.ups.length }}
                </span>
                <span v-else> </span>
              </div>
              <div class="reply_content">
                <p v-html="reply.content"></p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      post: {},
    };
  },
  watch: {
    $route(to, from) {
      this.getArticleData();
    },
  },
  methods: {
    getArticleData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then((res) => {
          if (res.data.success === true) {
            // this.isLoading = false;
            this.post = res.data.data;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
  beforeMount() {
    // this.isLoading = true;
    this.getArticleData();
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
    tabFormatter() {
      return function (post) {
        if (post.good == true) {
          return "精华";
        } else if (post.top == true) {
          return "置顶";
        } else if (post.tab == "ask") {
          return "问答";
        } else if (post.tab == "share") {
          return "分享";
        } else {
          return "招聘";
        }
      };
    },
  },
};
</script>

<style  >
@import url("../assets/markdown-github.css");
.article_background {
  background-color: rgb(225, 225, 225);
}
.article {
  margin-right: 360px;
}
.article_title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 3px;
  padding: 10px;
}
.infomation {
  margin: 0 8px;
  font-size: 12px;
  color: #838383;
}
.toptitle {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
}
.reply_img {
  height: 30px;
  width: 30px;
  margin: 5px;
}
.reply_name {
  color: #666;
  font-size: 12px;
  font-weight: 700;
  position: relative;
  top: -13px;
}
.reply_floor {
  font-size: 12px;
  font-weight: 700;
  color: #08c;
  margin-left: 10px;
}
.reply_up {
  color: #666;
  font-size: 12px;
  font-weight: 700;
  position: absolute;
  right: 10px;
}
.reply_top {
  display: flex;
  align-items: center;
  position: relative;
}
.reply_content {
  font-size: 15px;
  line-height: 1.7em;
  border-bottom: 1px solid rgb(240, 228, 228);
  padding: 10px;
}
header {
  background-color: rgb(255, 255, 255);
  border-radius: 3px 3px 0 0;
  border-bottom: 1px solid rgb(240, 228, 228);
}
.content {
  background-color: rgb(255, 255, 255);
  border-radius: 3px 3px 0 0;
  padding: 20px 10px 20px 10px;
}
.reply_ {
  background-color: rgb(255, 255, 255);
  border-radius: 3px 3px 0 0;
}
.reply {
  margin-top: 10px;
}
.add_background {
  height: 15px;
}
a {
  text-decoration: none;
}
.markdown-text img {
  width: 50% !important;
}
.markdown-text ul,
ol,
li {
  list-style: none;
}
</style>