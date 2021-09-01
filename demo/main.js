import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import Dialog from '../src';

Vue.use(ElementUI);
Vue.use(Dialog, {
  cancelText: '取消',
  successText: '确定',
})

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
})