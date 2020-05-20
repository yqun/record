// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入muse-ui
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import Message from 'muse-ui-message';
import 'muse-ui-message/dist/muse-ui-message.css';
import Toast from 'muse-ui-toast';

import './assets/css/common.css'
Vue.config.productionTip = false

Vue.use(MuseUI);
Vue.use(Message);
Vue.use(Toast, {
    close: false,
    position: 'top-end',
    time: 800
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
