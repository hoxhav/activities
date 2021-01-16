import ApiService from '@/services/api.service';

const state = {
    fetchedActivities: false,
    activities: [],
};

const getters = {

    getActivities: (state) => {
        return state.activities;
    },

    hasFetchedActivities: (state) => {
        return state.fetchedActivities;
    }

};

const mutations = {

    setActivities(state, activities) {
        state.activities = activities;
    },

    setFetchedActivities(state, value) {
        state.fetchedActivities = value;
    },



};

const actions = {

    async fetchActivities({commit}) {

        let response = await ApiService.get('/activities');

        let activities = response.data;

        commit('setActivities', activities.data);

        commit('setFetchedActivities', true);

    },

};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
