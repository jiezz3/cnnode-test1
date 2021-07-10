import VueRouter from "vue-router";
import Vue from 'vue'
import List from "../components/list.vue";
window.Vue = Vue
Vue.use(VueRouter);

export default new VueRouter({
    routers: [
        {
            name: 'root',
            path: '/',
            component: {
                main: List
            }
        }
    ]
})