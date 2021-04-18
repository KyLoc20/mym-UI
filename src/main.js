import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/style.css'
import './assets/typography.css'
Vue.config.productionTip = false
Vue.use(VueRouter)

import StepperExample from "./examples/StepperExample"
import AvatarExample from "./examples/AvatarExample"

const routes = [
    { path: '/', component: AvatarExample },
    { path: '/stepper', component: StepperExample },
    { path: '/avatar', component: AvatarExample },
    // { path: '/boo', component: Boo },
]

const router = new VueRouter({
    routes
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')