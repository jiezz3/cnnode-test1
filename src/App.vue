<template>
  <div>
    <Header />
    <router-view name="main"></router-view>
  </div>
</template>

<script>
import Header from "./components/header.vue";
// import List from "./components/list.vue";
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
</style>