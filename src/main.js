import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

Vue.use(ElementUI);

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://qgstudio.org:11291';
Vue.prototype.$http = axios
// Vue.prototype.$ajax = axios;

console.log(axios)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
