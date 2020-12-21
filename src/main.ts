import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Antd);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.axios.defaults.baseURL = 'http://localhost:5000/api/';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
