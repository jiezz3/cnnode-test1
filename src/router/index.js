import Vue from 'vue'
import Router from 'vue-router'
import Article from "../components/Article.vue";
import PostList from "../components/PostList.vue"
import UserInfo from "../components/UserInfo.vue"
import SideBar from "../components/SideBar.vue"

Vue.use(Router)

export default new Router(
    {
        // mode: "history",
        routes: [
            {
                name: 'root',
                path: '/',
                components: {
                    main: PostList
                }
            },
            {
                name: 'post_content',
                path: '/topic/:id&author=:name',
                components: {
                    main: Article,
                    sidebar: SideBar
                }
            },
            {
                name: 'user_info',
                path: '/user/:name',
                components: {
                    main: UserInfo
                }
            }



        ]
    }
)