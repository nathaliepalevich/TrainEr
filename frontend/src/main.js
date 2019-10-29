import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'vue-material/dist/vue-material.min.css'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueMaterial from 'vue-material'
// import * as VueGoogleMaps from 'vue2-google-maps';


import {
  Settings
} from 'luxon'

Settings.defaultLocale = 'he'

var VueScrollTo = require('vue-scrollto');

Vue.use(VueAwesomeSwiper, /* { default global options } */)
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyBbf-OSd3gYrA2hOp7KFsRK4FxE4R6RCKI',
//     libraries: 'places'
//   }
// });
Vue.use(require('vue-moment'));
Vue.use(VueMaterial)
Vue.use(Datetime)
Vue.use(VueScrollTo)
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')