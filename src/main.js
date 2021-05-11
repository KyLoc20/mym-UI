import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/style.css'
import './assets/typography.css'
import './assets/layout.less'
import './assets/legacy.less'
Vue.config.productionTip = false
Vue.use(VueRouter)
import _ from 'lodash'
Vue.prototype._ = _
import StepperExample from "./examples/StepperExample"
import AvatarExample from "./examples/AvatarExample"
import FloatActionButtonExample from "./examples/FloatActionButtonExample"
import ButtonExample from "./examples/ButtonExample"
import SliderExample from "./examples/SliderExample"
import CardExample from "./examples/CardExample"
import RadioExample from "./examples/RadioExample"
const routes = [
    { path: '/', component: AvatarExample },
    { path: '/stepper', component: StepperExample },
    { path: '/avatar', component: AvatarExample },
    { path: '/float-action-button', component: FloatActionButtonExample },
    { path: '/radio-button', component: RadioExample },
    { path: '/button', component: ButtonExample },
    { path: '/slider', component: SliderExample },
    { path: '/card', component: CardExample },
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
            if (to.hash) return { selector: to.hash, offset: { x: 0, y: 70 } }
            else return
        }
    }
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')