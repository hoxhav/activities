const Activities = () => import('../views/activities/Activities.vue');

export default function getUserRoutes() {
    return [{
        path: 'activities',
        name: 'Activities',
        component: Activities,
    }]
}
