const state = {

    status: 0,

    message: '',

};

const getters = {

    getMessage: (state) => {
        return state.message;
    },

    getStatus: (state) => {
        return state.status;
    },

};

const mutations = {

    setStatus(state, value) {
        state.status = value;
    },

    setMessage(state, value) {
        state.message = value;
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
