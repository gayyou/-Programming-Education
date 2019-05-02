import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

Vue.use(ElementUI);
Vue.prototype.$http = axios
// Vue.prototype.$ajax = axios;
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://127.130.1484:8089/';

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
