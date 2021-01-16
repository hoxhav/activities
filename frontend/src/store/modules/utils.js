const state = {
    status: '',

    errors: '',

    warning: '',

    success: '',
};

const getters = {

    getStatus: (state) => {
        return state.status;
    },

    getErrors: (state) => {
        return state.errors;
    },

    getWarning: (state) => {
        return state.warning;
    },

    getSuccess: (state) => {
        return state.success;
    }

};

const mutations = {

    setStatus(state, value) {
        state.status = value;
    },

    setErrors(state, value) {
        state.errors = value;
    },

    setWarning(state, value) {
        state.warning = value;
    },

    setSuccess(state, value) {
        state.success = value;
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
