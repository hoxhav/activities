import Vue from 'vue'
import VueRouter from 'vue-router'
import TokenService from "@/services/token.service";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/activities',
    name: 'Activities',
    component: () => import('@/views/activities/Activities.vue')
  },

]

const router = new VueRouter({
  routes
})



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

  next();

});

export default router
