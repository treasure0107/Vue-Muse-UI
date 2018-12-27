// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/styles/reset.css';
/*import 'muse-ui-loading/dist/muse-ui-loading.css';*/
import '@/scripts/iconfont/iconfont.css';
import 'muse-ui/dist/muse-ui.css';
import '@/styles/material-icons/material-icons.css';
import '@/styles/public.scss';
import 'vue-social-share/dist/client.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import MuseUI from 'muse-ui';
/*import Loading from 'muse-ui-loading';*/
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import Share from 'vue-social-share';
import until from "@/scripts/until";
import {http} from "@/scripts/http";
Vue.use(MuseUI);
/*Vue.use(Loading,{
  overlayColor:"#484848"
});*/
Vue.use(Message, {
  successIcon: 'check_circle',
  infoIcon: 'info',
  warningIcon: 'priority_high',
  errorIcon: 'warning',
  iconSize: 24,
  width: 350,
  maxWidth: '80%',
  className: '',
  okLabel: '确定',
  cancelLabel: '取消',
  transition: 'scale'
});
Vue.use(Toast, {
  position: 'top',
  time: 2500,
  close: true
});
Vue.use(Share);
Vue.prototype.$until = until;
Vue.prototype.$axios = axios;
new http({"until": until, "axios": axios});
Vue.config.productionTip = false;
Vue.directive('dbClick', {
  inserted(el, binding) {
    el.addEventListener('click', e => {
      if (!el.disabled) {
        el.disabled = true;
        let timer = setTimeout(() => {
          el.disabled = false;
        }, 3000)
      }
    })
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
