<template>
  <div class="header">
    <a href="/">
      <div class="img">
        <img
          src="//static2.cnodejs.org/public/images/cnodejs_light.svg"
          alt=""
        />
      </div>
    </a>
    <ul>
      <li><a href="/">首页</a></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
  font-size: 14px;
  color: #ccc;
  text-shadow: nonr;
}
img {
  width: 120px;
  margin-left: 100px;
}
.header {
  background: rgb(68, 68, 68);
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
ul {
  display: flex;
}
li {
  padding: 15px;
}
</style>