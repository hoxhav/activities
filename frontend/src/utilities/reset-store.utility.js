export default function resetStoreFlags(store) {
    store.commit('user/setFetchedUser', false);
    store.commit('activities/setFetchedActivities', false);
}