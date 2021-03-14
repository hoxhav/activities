import ApiService from '@/services/api.service';
import {AuthenticationError} from "@/services/user.service";

const state = {
    fetchedUser: false,
    id: 0,
    name: "",
    email: "",
};

const getters = {

    getId: (state) => {
        return state.id;
    },

    getName: (state) => {
        return state.name;
    },

    getEmail: (state) => {

        return state.email;
    },

    hasFetchedUser: (state) => {
        return state.fetchedUser;
    }

};

const mutations = {

    setId(state, id) {
        state.id = id;
    },

    setName(state, name) {
        state.name = name;
    },

    setEmail(state, email) {
        state.email = email;
    },

    setFetchedUser(state, value) {
        state.fetchedUser = value;
    },



};

const actions = {

    async fetchUser({commit}) {

        try {

            let response = await ApiService.get('/user/me');


            if(!response.data.success)
                return false

            let user = response.data.data.user;

            commit('activities/setActivities', response.data.data.activities, { root: true });

            commit('activities/setFetchedActivities', true, { root: true });

            commit('setId', user.id);
            commit('setName', user.name);
            commit('setEmail', user.email);
            commit('setFetchedUser', true);

        } catch (error ) {

            console.log(error);

        }

    },

};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
