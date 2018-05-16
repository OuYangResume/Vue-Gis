import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '@/components/user'

import Resource from 'vue-resource'
import echarts from 'echarts'

import App from '@/App'
import Test from '@/components/test'
import Translate from '@/components/translate'
import Map from '@/components/map/mapContainer'
import EchartsFull from '@/components/echarts/echartsFull'


Vue.use(Resource)

Vue.prototype.$echarts = echarts
Vue.use(VueRouter)

export default new  VueRouter({
    routes:[
        {
            path: "/", component: User
          },
          {
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
            component:EchartsFull,
          }
    ]
})