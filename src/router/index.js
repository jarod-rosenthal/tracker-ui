import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Settings from '../views/Settings.vue'
import Library from '../views/Library.vue'
//import LiveView from '../views/LiveView.vue'
import Events from '../views/Events.vue'
import EventView from '../views/EventView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Dashboard,
    meta: {
		title: "UAPTN: Home"
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
		title: "UAPTN: Dashboard"
    },
  },
  /*
  {
    path: '/live',
    name: 'live',
    component: LiveView,
    meta: {
		title: "UAPTN: Live View"
    },
  },
  */
  {
    path: '/events',
    name: 'events',
    component: Events,
    meta: {
		title: "UAPTN: Events"
    },
  },
  {
    path: '/library',
    name: 'library',
    component: Library,
    meta: {
		title: "UAPTN: Video Library"
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
		title: "UAPTN: Settings"
    },
  },
  {
    path: '/event/:id',
    name: 'event',
    component: EventView,
    props: true,
    meta: {
		title: "UAPTN: Event"
    },
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
