import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import ApiService from "./services/api.service";
import {rules} from './utilities/form-validation-input.utility.js'
Vue.config.productionTip = false

/**
 * mixins
 */
import axiosWrapper from './mixins/axiosWrapper';




(async function main() {

  await ApiService.init(process.env.VUE_APP_BASE_URL);

  Vue.mixin(axiosWrapper);

  new Vue({
    router,
    store,
    vuetify,

    data() {

      return {

        rules

      }
    },


    render: h => h(App)
  }).$mount('#app');
})();