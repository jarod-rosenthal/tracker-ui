import Vue from 'vue'
import VueRouter from 'vue-router'
// import Blank from '../views/Blank.vue'
import Logs from '../views/Logs.vue'
import Dashboard from '../views/Dashboard.vue'
import Settings from '../views/Settings.vue'
import Library from '../views/Library.vue'
import LiveView from '../views/LiveView.vue'
import Events from '../views/Events.vue'
import EventView from '../views/EventView.vue'
// import Connection from '../views/Connection.vue'
import Login from '../views/Login.vue'
// import Terminal from '../views/Terminal.vue'
import FirstConfigWizard from '../views/FirstConfigWizard.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Dashboard,
  //   meta: {
  //     title: "Sky Hub: Dashboard"
  //   },
  // },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: "Sky Hub: Login"
    },
  },
  {
    path: '/configwizard',
    name: 'configwizard',
    component: FirstConfigWizard,
    meta: {
      title: "Sky Hub: First Config Wizard"
    },
  },    
  // {
  //   path: '/connection',
  //   name: 'connection',
  //   component: Connection,
  //   meta: {
  //     title: "Sky Hub: Connection Problem"
  //   },
  // },  
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: "Sky Hub: Dashboard"
    },
  },
  {
    path: '/live',
    name: 'live',
    component: LiveView,
    meta: {
		title: "Sky Hub: Live View"
    },
  },
  {
    path: '/events',
    name: 'events',
    component: Events,
    meta: {
      title: "Sky Hub: Events"
    },
  },
  {
    path: '/library',
    name: 'library',
    component: Library,
    meta: {
      title: "Sky Hub: Video Library"
    },
  },
  {
    path: '/logs',
    name: 'logs',
    component: Logs,
    meta: {
      title: "Sky Hub: Container Logs"
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      title: "Sky Hub: Settings"
    },
  },
  {
    path: '/event/:id',
    name: 'event',
    component: EventView,
    props: true,
    meta: {
      title: "Sky Hub: Event"
    },
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
