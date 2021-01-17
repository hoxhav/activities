const Activities = () => import('../views/activities/Activities.vue');
const Help = () => import('../views/help/Help.vue');

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
