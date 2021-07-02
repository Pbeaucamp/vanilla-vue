import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import NotFoundComponent from '@/components/NotFound.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  { 
    path: '*', 
    component: NotFoundComponent 
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
