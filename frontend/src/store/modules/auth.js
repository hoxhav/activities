import {AuthenticationError, UserService} from '@/services/user.service';
import router from '@/router';
import store from '../index.js';

const state = {
    authenticating: false,
    activities: [],
    status: 0,
    message: '',
};

const getters = {

    authenticationStatus: (state) => {
        return state.status;
    },

    authenticationMessage: (state) => {
        return state.message;
    },

    authenticating: (state) => {

        return state.authenticating;
    },

    activities: (state) => {

        return state.activities;
    }
};

const mutations = {

    loginRequest(state) {
        state.authenticating = true;
        state.message = '';
        state.status = 0;
    },

    loginSuccess(state, value) {
        state.authenticating = false;
        state.status = value.status;
        state.activities = value.activities;
        state.message = "Successfully logged in.";
    },

    setUserActivities(state, value) {
        state.activities = value;
    },

    loginError(state, {errorCode, errorMessage}) {
        state.authenticating = false;
        state.status = errorCode;
        state.message = errorMessage.error;
    }

};

const actions = {
    async login({commit}, {email, password}) {

        commit('loginRequest');

        try {
            const response = await UserService.login(email, password);

            if (response.status === 200) {

                commit('loginSuccess', response);

                return {
                    status: response.status,
                    message: 'Sukses!'
                }
            }

        } catch (e) {

            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})

            }
            return e;
        }
    },

    async logout() {
        await UserService.logout();
        await router.push('/');
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
