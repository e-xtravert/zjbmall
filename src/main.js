import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from './components/common/toast';

import FastClick from 'fastclick'
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

//解决移动端300ms延迟:安装，注册和调用三步即可
FastClick.attach(document.body)
Vue.use(toast)
//图片懒加载解决
Vue.use(VueLazyLoad)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
