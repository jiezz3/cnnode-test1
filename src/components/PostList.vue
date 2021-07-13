<template>
  <div class="PostList">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div class="posts">
      <ul>
        <li>
          <div class="toobar">
            <span><a href="" class="top">全部</a></span>
            <span><a href="">精华</a></span>
            <span><a href="">问答</a></span>
            <span><a href="">分享</a></span>
            <span><a href="">招聘</a></span>
            <span><a href="">客户端测试</a></span>
          </div>
        </li>

        <li v-for="post in posts" class="out" :key="post.id">
          <img :src="post.author.avatar_url" alt="" />
          <span class="allcount">
            <span class="reply_count">{{ post.reply_count }}</span
            >/{{ post.visit_count }}
          </span>
          <span
            :class="[
              {
                put_good: post.good == true,
                put_top: post.top == true,
                'topiclist-tab': post.good != true && post.top != true,
              },
            ]"
          >
            <span>
              {{ tabFormatter(post) }}
            </span>
          </span>
          <router-link
            :to="{
              name: 'post_content',
              params: { id: post.id, name: post.author.loginname },
            }"
          >
            <span class="title">{{ post.title }}</span>
          </router-link>
          <span class="last_reply"> {{ formatDate(post.last_reply_at) }}</span>
        </li>
        <li class="btn"><PageBtn @handleList="renderList" /></li>
      </ul>
    </div>
  </div>
</template>

<script>
import PageBtn from "./PageBtn.vue";
export default {
  components: { PageBtn },
  data() {
    return {
      isLoading: false,
      posts: [],
      postpage: 1,
    };
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
    // ellipsis() {
    //   return function (value) {
    //     if (value.length > 40) {
    //       return value.slice(0, 40) + "...";
    //     } else return value;
    //   };
    // },
  },
  methods: {
    renderList(value) {
      this.postpage = value;
      this.getData();
    },
    getData() {
      this.$http
        .get(" https://cnodejs.org/api/v1/topics", {
          params: {
            page: this.postpage,
            limit: 20,
          },
        })
        .then((res) => {
          this.posts = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  },
};
</script>

<style scoped>
.PostList {
  background-color: #e1e1e1;
}
.posts {
}
.PostList img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}
ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
}
ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}

.last_reply {
  text-align: right;
  min-width: 50px;
  white-space: nowrap;
  position: Absolute;
  right: 20px;
  bottom: 3px;
  color: #778087;
  font-size: 12px;
}
.out {
  position: relative;
}
.title {
  margin-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;
}

.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}
.reply_count {
  color: #9e78c0;
  font-size: 14px;
}
.allcount {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}
.toobar {
  height: 40px;
  background-color: #f5f5f5;
}

.toobar span a {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
  cursor: pointer;
  text-decoration: none;
}
.toobar span a.top {
  color: #fff;
  background-color: #80bd01;
  padding: 0 5px;
  border-radius: 5px;
}
.router-link-active {
  text-decoration: none;
  color: yellow;
}
a {
  text-decoration: none;
  color: black;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>