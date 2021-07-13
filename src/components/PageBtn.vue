<template>
  <div>
    <button @click="changBtn">首页</button>
    <button @click="changBtn">上一页</button>
    <button v-if="currentPage > 4" class="pagebtn">......</button>
    <button
      v-for="page in pagelist"
      :key="page"
      @click="changBtn(page)"
      :class="[{ currentPage: page === currentPage }, , 'pagebtn']"
    >
      {{ page }}
    </button>
    <button @click="changBtn">下一页</button>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      pagelist: [1, 2, 3, 4, 5, "......"],
      currentPage: 1,
    };
  },
  methods: {
    changBtn(page) {
      if (typeof page !== "number") {
        switch (page.target.innerText) {
          case "上一页":
            $("button.currentPage").prev().click();
            break;
          case "下一页":
            $("button.currentPage").next().click();
            break;
          case "首页":
            this.pagelist = [1, 2, 3, 4, 5, "......"];
            this.changBtn(1);
            break;

          default:
            break;
        }
        return;
      }
      if (page === this.pagelist[4]) {
        this.pagelist.shift();
        this.pagelist.splice(4, 0, this.pagelist[3] + 1);
      } else if (page === this.pagelist[0] && page != 1) {
        this.pagelist.unshift(this.pagelist[0] - 1);
        this.pagelist.splice(5, 1);
      }
      this.currentPage = page;
      this.$emit("handleList", this.currentPage);
    },
  },
};
</script>

<style  scoped>
button {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #778087;
  border-radius: 3px;
  outline: none;
  height: 21px;
  cursor: pointer;
  padding: 0 2px;
  width: 55px;
  height: 29px;
}
.currentPage {
  color: white;
  background-color: #1f1b1b;
}
.pagebtn {
  position: relative;
  bottom: 1px;
  width: 40px;
  margin: 0 4px;
}
</style>
