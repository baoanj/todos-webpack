import Vue from 'vue';
import { Button, Form, FormItem, Input, Radio, RadioGroup, Message } from 'element-ui';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Message);

Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
