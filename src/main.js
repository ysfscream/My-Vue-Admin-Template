import Vue from 'vue';
import { Message, MessageBox, Loading } from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Loading)
Vue.config.productionTip = false;
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
