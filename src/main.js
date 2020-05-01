import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import { routes } from './routes.js'
import axios from 'axios';
import { NavbarPlugin, CardPlugin } from 'bootstrap-vue'


import './css/bootstrap.min.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(NavbarPlugin)
Vue.use(CardPlugin)

axios.defaults.baseURL = process.env.VUE_APP_API_URL

//console.log('base url', process.env.VUE_APP_API_URL)

//console.log('node env', process.env.NODE_ENV)

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
