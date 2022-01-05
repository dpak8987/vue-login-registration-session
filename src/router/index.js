import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import Dashboard from '@/components/dashboard'

// The below code is to avoid duplicate navigation error when reloading the same path/page
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      alias: '/login'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})
