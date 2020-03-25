/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import '@mdi/font/css/materialdesignicons.css'
import lineClamp from 'vue-line-clamp'
import router from './router'
import VVideo from 'vue-videojs'
Vue.config.productionTip = false


Vue.use(VVideo);
Vue.use(lineClamp, { })

new Vue({
    vuetify,
    store,
    router,
    VVideo,
    render: h => h(App)
}).$mount('#app')

