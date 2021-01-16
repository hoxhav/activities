import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import ApiService from "./services/api.service";
import {rules} from './utilities/form-validation-input.utility.js';
import Notifications from "@/components/utils/Notifications";

Vue.component('app-notifications', Notifications);

Vue.config.productionTip = false;



/**
 * Utils components
 */


(async function main() {

  await ApiService.init(process.env.VUE_APP_BASE_URL);


  new Vue({
    router,
    store,
    vuetify,

    data() {

      return {

        rules,

      }
    },





    render: h => h(App)
  }).$mount('#app');
})();