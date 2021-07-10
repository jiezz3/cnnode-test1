import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from './router/index.js'



Vue.prototype.$http = Axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
