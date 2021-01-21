import Vue from 'vue'
import VueRouter from 'vue-router'
import TokenService from "@/services/token.service";
import store from '../store/index.js';
import getUserRoutes from './user.routes.js';

Vue.use(VueRouter)

function configRoutes() {
    return [
        {
            path: '/',
            name: 'Login',
            component: () => import(/* webpackChunkName: "login" */'@/views/auth/Login.vue'),
            meta: {
                public: true,
                onlyWhenLoggedOut: true
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import(/* webpackChunkName: "register" */'@/views/auth/Register.vue'),
            meta: {
                public: true,
                onlyWhenLoggedOut: true
            }
        },
        {
            path: '/',
            name: 'MainLayout',
            component: () => import(/* webpackChunkName: "mainLayout" */'../components/layout/MainLayout.vue'),
            children: getUserRoutes()
        }
    ];
}

const router = new VueRouter({
    mode: 'history',
    routes: configRoutes()
});


router.beforeEach(async (to, from, next) => {

    const isPublic = to.matched.some(record => record.meta.public);

    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);

    const loggedIn = !!await TokenService.getToken();

    if (!isPublic && !loggedIn) {
        return next({path: '/'});
    }
    // // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next( '/activities')
    }

    if(loggedIn) {

        if (!store.getters['user/hasFetchedUser']) {
            await store.dispatch('user/fetchUser');
        }

        if (!store.getters['activities/hasFetchedActivities']) {
            await store.dispatch('activities/fetchActivities');
        }

    }

    next();

});

export default router
