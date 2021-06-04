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
import ChipExample from "./examples/ChipExample"
import CheckboxExample from "./examples/CheckboxExample"
import ScrollCatalog from "./components//ScrollCatalog/ScrollCatalog";
const genRouteWithCatalog = (path, vNode) => ({
    components: {
        default: vNode,
        catalog: ScrollCatalog
    },
    props: {
        catalog: { path, items: vNode.anchors, title: "content" }
    }
})
const routes = [
    { path: '/', ...genRouteWithCatalog('/avatar', AvatarExample), },
    { path: '/avatar', ...genRouteWithCatalog('/avatar', AvatarExample), },
    { path: '/stepper', ...genRouteWithCatalog('/stepper', StepperExample), },
    { path: '/float-action-button', ...genRouteWithCatalog('/float-action-button', FloatActionButtonExample), },
    { path: '/button', ...genRouteWithCatalog('/button', ButtonExample), },
    { path: '/card', ...genRouteWithCatalog('/card', CardExample), },
    { path: '/checkbox', ...genRouteWithCatalog('/checkbox', CheckboxExample), },
    { path: '/radio-button', ...genRouteWithCatalog('/radio-button', RadioExample), },
    { path: '/chip', ...genRouteWithCatalog('/chip', ChipExample), },
    { path: '/slider', ...genRouteWithCatalog('/slider', SliderExample), },
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