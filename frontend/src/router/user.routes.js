const Activities = () => import(/* webpackChunkName: "activities" */'../views/activities/Activities.vue');
const Help = () => import(/* webpackChunkName: "help" */'../views/help/Help.vue');

export default function getUserRoutes() {
    return [
        {
            path: 'activities',
            name: 'Activities',
            component: Activities,
        },

        {
            path: 'help',
            name: 'Help',
            component: Help,
        },
    ]
}
