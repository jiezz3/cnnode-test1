<template>
  <div>
    <Header />
    <div class="main">
      <router-view name="sidebar"> </router-view>
      <router-view name="main"> </router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header1.vue";

export default {
  components: { Header },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: rgb(225, 225, 225);
}
.main {
  max-width: 1400px;
  margin: 0 auto;
}
</style>