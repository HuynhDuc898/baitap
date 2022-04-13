import Vue from 'vue'
import App from './App.vue'
// import router from './router'

Vue.config.productionTip = false

import 'bootstrap'
import router from './router'
// import vue router
// import VueRouter from 'vue-router'

// import Login from './components/Login'
// import Register from './components/Register'
// import Dashboard from './components/Dashboard'

// Vue.use(VueRouter)

// const routes = [
//   { path: '/login', component: Login, name: 'login' },
//   { path: '/register', component: Register },
//   { path: '/', component: Dashboard, name: 'home' }
// ]

// const router = new VueRouter({
//   mode: 'history',
//   routes 
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
