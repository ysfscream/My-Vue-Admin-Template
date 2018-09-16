import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from '../store';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// 路由验证
router.beforeEach((to, from, next) => {
  const { requiresAuth = true } = to.meta
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  if (requiresAuth) {
    if (!store.state.account.user.token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;
