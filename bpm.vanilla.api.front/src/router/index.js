import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import NotFoundComponent from '@/components/NotFound.vue'
import Utilisateurs from '@/views/Utilisateurs'
import Groupes from '@/views/Groupes'
import Referentiels from '@/views/Referentiels'
import Utilisateur from '@/views/Utilisateur'
import Groupe from '@/views/Groupe'
import Referentiel from '@/views/Referentiel'

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
  {
    path: '/users',
    name: 'Utilisateurs',
    component: Utilisateurs
  },
  {
    path: '/groups',
    name: 'Groupes',
    component: Groupes
  },
  {
    path: '/repositories',
    name: 'Referentiels',
    component: Referentiels
  },
  {
    path: '/user/:login',
    name: 'Utilisateur',
    component: Utilisateur
  },
  {
    path: '/group/:name',
    name: 'Groupe',
    component: Groupe
  },
  {
    path: '/repository/:name',
    name: 'Referentiel',
    component: Referentiel
  },  

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
