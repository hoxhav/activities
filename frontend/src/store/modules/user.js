import ApiService from '@/services/api.service';

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

        let response = await ApiService.post('/auth/me');

        let user = response.data;

        commit('setId', user.id);
        commit('setName', user.name);
        commit('setEmail', user.email);
        commit('setFetchedUser', true);

    },

};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
