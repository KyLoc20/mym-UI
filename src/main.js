import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/style.css'
import './assets/typography.css'
Vue.config.productionTip = false
Vue.use(VueRouter)

import StepperExample from "./examples/StepperExample"
import AvatarExample from "./examples/AvatarExample"
import FloatActionButtonExample from "./examples/FloatActionButtonExample"

const routes = [
    { path: '/', component: AvatarExample },
    { path: '/stepper', component: StepperExample },
    { path: '/avatar', component: AvatarExample },
    { path: '/float-action-button', component: FloatActionButtonExample },
    // { path: '/boo', component: Boo },
]

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        // console.log('scrollBehavior', to.hash, from, savedPosition)
        if (savedPosition) {
            //GoForward or GoBack Button in the browser
            return savedPosition
        } else {
            console.log('scrollBehavior', to.hash, from, savedPosition)
            return { selector: to.hash, offset: { x: 0, y: 70 } }
        }
    }
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')