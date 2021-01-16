import Vue from 'vue';
import store from '../store';
import TokenService from './token.service.js';
import axios from "axios";

const ApiService = {
    async init(baseURL = "http://127.0.0.1:8000/api") {

        Vue.prototype.$axios = axios;

        Vue.prototype.$axios.defaults.baseURL = baseURL;

        let token = await TokenService.getToken();

        if (token) {
            await this.setHeader();
        } else console.log('Could not set header.');

        this.mount401Interceptor();
    },

    async setHeader() {
        Vue.prototype.$axios.defaults.headers.common["Authorization"] = `Bearer ${await TokenService.getToken()}`
    },

    removeHeader() {
        Vue.prototype.$axios.defaults.headers.common = {}
    },

    async get(resource) {
        return Vue.prototype.$axios.get(resource)
    },

    post(resource, data) {
        return Vue.prototype.$axios.post(resource, data)
    },

    put(resource, data) {
        return Vue.prototype.$axios.put(resource, data)
    },

    delete(resource) {
        return Vue.prototype.$axios.delete(resource)
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     **/
    customRequest(data) {
        return Vue.prototype.$axios(data)
    },

    mount401Interceptor() {
        Vue.prototype.$axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.request.status == 401) {
                    store.dispatch('auth/logout');
                }

                // If error was not 401 just reject as is
                throw error;
            }
        )
    }
};

export default ApiService
