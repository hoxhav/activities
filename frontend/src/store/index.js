import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger';
import auth from "./modules/auth.js";
import activities from "./modules/activities.js";
import user from "./modules/user.js";
import utils from "./modules/utils";


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        auth,
        user,
        activities,
        utils,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
