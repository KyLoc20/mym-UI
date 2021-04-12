import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/style.css'
Vue.config.productionTip = false
Vue.use(VueRouter)


const routes = [
    // { path: '/foo', component: Foo },
    // { path: '/boo', component: Boo },
]

const router = new VueRouter({
    routes
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')