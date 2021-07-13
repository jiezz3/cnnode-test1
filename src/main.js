import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import Router from 'vue-router'
import router from './router/index.js'



Vue.prototype.$http = Axios
Vue.use(Router)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

