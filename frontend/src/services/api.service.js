import Vue from 'vue';
import store from '../store';
import axios from "axios";

const ApiService = {
    async init(baseURL = "http://localhost:8000/api") {

        const instance = axios.create({
            withCredentials: true,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        Vue.prototype.$axios = instance;

        Vue.prototype.$axios.defaults.baseURL = baseURL;

        this.mount401Interceptor();
    },

    async get(resource) {

        return Vue.prototype.$axios.get(resource);

    },

    async post(resource, data) {

        return Vue.prototype.$axios.post(resource, data);

    },

    async put(resource, data) {

        return Vue.prototype.$axios.put(resource, data);

    },

    async patch(resource) {

        return Vue.prototype.$axios.patch(resource);

    },

    async delete(resource) {

        return Vue.prototype.$axios.delete(resource);

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
                    store.commit("utils/setStatus", error.request.status);
                    store.commit("utils/setMessage", error.request.statusText);
                    store.dispatch('auth/logout');
                }

                // If error was not 401 just reject as is
                throw error;
            }
        )
    }
};

export default ApiService
