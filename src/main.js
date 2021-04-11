import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/style.css'
Vue.config.productionTip = false
Vue.use(VueRouter)
    // 1. 定义 (路由) 组件。
    // 可以从其他文件 import 进来


const routes = [
    // { path: '/foo', component: Foo },
    // { path: '/boo', component: Boo },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')