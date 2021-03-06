
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import '@mdi/font/css/materialdesignicons.css'
import lineClamp from 'vue-line-clamp'
import router from './router'
import 'vue-video-player/node_modules/video.js/dist/video-js.min.css'
import VueVideoPlayer from 'vue-video-player'
import * as VueGoogleMaps from 'gmap-vue'
import JsonViewer from 'vue-json-viewer'

Vue.config.productionTip = false

Vue.use(VueVideoPlayer);
Vue.use(lineClamp, {})
Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDGLC_jw0ovNaml5ARawncOlSB9FF2GtzA',
      v: '3.42',
      libraries: ""
    },
    installComponents: false,
});
Vue.use(JsonViewer);


document.addEventListener('DOMContentLoaded', function() {
    Vue.component('google-map', VueGoogleMaps.Map);
    Vue.component('google-marker', VueGoogleMaps.Marker)
});

new Vue({
    vuetify,
    store,
    router,
    VueVideoPlayer,
    VueGoogleMaps,
    render: h => h(App)
}).$mount('#app')

