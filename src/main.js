/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import '@mdi/font/css/materialdesignicons.css'
import lineClamp from 'vue-line-clamp'
import router from './router'
import 'vue-video-player/node_modules/video.js/dist/video-js.min.css'
import VueVideoPlayer from 'vue-video-player'

Vue.config.productionTip = false

Vue.use(VueVideoPlayer);
Vue.use(lineClamp, {})

new Vue({
    vuetify,
    store,
    router,
    VueVideoPlayer,
    render: h => h(App)
}).$mount('#app')

