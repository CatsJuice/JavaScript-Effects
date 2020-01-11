import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)


import axios from 'axios'
// import VueAxios from 'vue-axios'
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;
// Vue.use(VueAxios, axios);


Vue.prototype.$server_root = "http://localhost:3003"
// Vue.prototype.$server_root = "http://clock.catsjuice.cn"

/**
 * Element
 */
import { Input, Icon, Button, Upload,Notification } from 'element-ui';
Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Upload)
Vue.prototype.$notify = Notification

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
