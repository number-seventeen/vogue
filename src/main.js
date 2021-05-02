// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from "axios"
import router from './router'
import ElementUI from 'element-ui';
import * as util from "./util/util.js"
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import Loading from '@/router/Loading/loading.js'

Vue.use(ElementUI);
Vue.use(Loading);
Vue.config.productionTip = false

//挂载axios
Vue.prototype.$http = axios
//设置访问根路径
axios.defaults.baseURL="http://localhost:9000"



Vue.prototype.$util = util
Vue.prototype.validForbid=util.validForbid
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
