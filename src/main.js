// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Resource from 'vue-resource'
import echarts from 'echarts'

import App from './App'
import Test from './components/test'
import User from './components/user'
import Translate from './components/translate'
import Map from './components/map/mapContainer'
import EchartsFull from './components/echarts/echartsFull'

Vue.use(VueRouter)
Vue.use(Resource)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

//设置路由
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: "/", component: User
    }, {
      path: "/test", component: Test
    },
    {
      path:"/Translate",
      component: Translate,
    },
    {
      path:'/map',
      component:Map
    },
    {
      path:'/echarts',
      component:EchartsFull
    }
  ]
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
