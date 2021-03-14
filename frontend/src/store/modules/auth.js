import {AuthenticationError, RegistrationError,  UserService} from '@/services/user.service';
import router from '@/router';
import store from '../index.js';
import resetStoreFlags from "../../utilities/reset-store.utility";

const state = {
    authenticating: false,
    status: 0,
    message: '',
    isLoggedIn: false,
    registrationErrors: [],
};

const getters = {

    authenticationStatus: (state) => {
        return state.status;
    },

    authenticationMessage: (state) => {
        return state.message;
    },

    registrationFormErrors: (state) => {
        return state.registrationErrors
    },

    authenticating: (state) => {

        return state.authenticating;
    },


};

const mutations = {

    loginRequest(state) {
        state.authenticating = true;
        state.message = '';
        state.status = 0;
    },

    success(state, value) {
        state.authenticating = false;
        state.status = value.status;
        state.message = value.message;
    },

    loginError(state, {errorCode, errorMessage}) {
        state.authenticating = false;
        state.status = errorCode;
        state.message = errorMessage.error;
    },

    registrationError(state, {errorCode, errorMessage, errors}) {
        state.authenticating = false;
        state.status = errorCode;
        state.message = errorMessage;
        state.registrationErrors = errors;
    }

};

const actions = {
    async login({commit}, {email, password}) {

        commit('loginRequest');

        try {
            const response = await UserService.login(email, password);

            if (response.status === 200) {

                commit('success', response);

                if(response.user) {
                    commit('activities/setActivities', response.activities, { root: true });

                    commit('activities/setFetchedActivities', true, { root: true });

                    commit('user/setId', response.user.id, { root: true });
                    commit('user/setName', response.user.name, { root: true });
                    commit('user/setEmail', response.user.email, { root: true });
                    commit('user/setFetchedUser', true, { root: true });
                }

            }

        } catch (e) {

            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})

            }
            return e;
        }
    },

    async register({commit}, {newUser}) {

        try {

            const response = await UserService.register(newUser);

            if (response.status === 201) {

                commit('success', response);

            };

        } catch (e) {

            if (e instanceof AuthenticationError) {
                commit('registrationError', {errorCode: e.errorCode, errorMessage: e.message, errors: e.errors})

            }
            return e;
        }
    },

    async logout() {
        resetStoreFlags(store);
        await UserService.logout();
        await router.push('/').catch(()=>{});;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
