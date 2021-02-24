const state = {

    status: 0,

    message: '',

    loading: false,

};

const getters = {

    getMessage: (state) => {
        return state.message;
    },

    getStatus: (state) => {
        return state.status;
    },

    getLoadingBarStatus: (state) => {
        return state.loading;
    }

};

const mutations = {

    setStatus(state, value) {
        state.status = value;
    },

    setMessage(state, value) {
        state.message = value;
    },

    setLoading(state, value) {
        state.loading = value;
    },

    resetNotifications(state) {
        state.message = '';
        state.status = 0;

    },

};

const actions = {

};


export default {
    namespaced: true,
    state,
    getters,
    mutations
};
