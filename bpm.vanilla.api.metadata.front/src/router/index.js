import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import NotFoundComponent from '@/components/NotFound.vue'
//import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/portail/:groupID/:metadataName',
    name: 'Home',
    component: Dashboard,
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
