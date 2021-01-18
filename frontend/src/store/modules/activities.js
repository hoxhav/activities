import ApiService from '@/services/api.service';
import store from '../index.js';

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

    setCompletedActivity(state, activity_id) {
        let removeIndex = state.activities.map(function(item) { return item.id; }).indexOf(activity_id);

        state.activities.splice(removeIndex, 1);
    },

    setAddedActivity(state, activity) {

        state.activities.unshift({
            'id': activity.id,
            'name': activity.name,
            'description': activity.description,
            'status': activity.status,
        });
    },


};

const actions = {

    async fetchActivities({commit}) {

        try  {

            let response = await ApiService.get('/activities');

            let activities = response.data;

            commit('setActivities', activities.data);

            commit('setFetchedActivities', true);

        } catch (error) {

            console.log(error);

        }

    },

    async completeActivity({commit}, {activity_id}) {

        try  {
            let response = await ApiService.patch('/activities/' + activity_id + '/status');

            if (response.status == 200) {

                commit('setCompletedActivity', activity_id);

            }

            return response.status;

        } catch (error) {

            console.log(error);

        }

    },

    async addActivity({commit}, {name, description}) {

        try  {
            let response = await ApiService.post('/activities', {
                "name": name,
                "description": description
            });

            if (response.status == 201) {

                commit('setAddedActivity', response.data.data);

            }

            return response.status;

        } catch (error) {

            store.commit("utils/setStatus", error.response.status);

            store.commit("utils/setMessage", "Your activity was not added.");

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
