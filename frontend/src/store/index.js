import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger';
import auth from "./modules/auth.js";
import activities from "./modules/activities.js";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        auth,
        activities,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
