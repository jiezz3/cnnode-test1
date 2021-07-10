import VueRouter from "vue-router";
import Vue from 'vue'
import List from "../components/list.vue";
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