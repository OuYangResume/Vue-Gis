import Vue from 'vue'
import VueRouter from 'vue-router'

import Resource from 'vue-resource'
import echarts from 'echarts'

Vue.use(Resource)

Vue.prototype.$echarts = echarts
Vue.use(VueRouter)

/* Layout */
import Layout from '../views/layout/Layout'

export const router1=[
  {
      path: '/', 
      component: () => import('@/components/user'),
      //別名。路徑和"/"效果一樣
      alias: '/user',
      //重定向。訪問'/'和'/user'到地圖
      //redirect: '/map'
    },
    {
      path: "/test", 
      component: () =>import('@/components/test')
    },
    {
      path:"/Translate",
      component: ()=>import('@/views/translate/translate'),
    },
    {
      path:'/map',
      name:'map',
      component:() =>import('@/views/map'),
    },
    {
      path:'/echarts',
      component:()=>import('@/components/echarts/echartsFull'),
    }
]

const router2=[
  {
    path: '/',
    component: Layout,
    redirect: '/user',
    name: 'User',
    hidden: true,
    children: [{
      path: 'user',
      component: ()=>import("@/components/user")
    }]
  },
  {
    path: '/',
    component: Layout,
    name: 'Test',
    children: [
      {
        path: 'test',
        component: () => import('@/components/test'),
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'Translate',
        component: () => import('@/views/translate/translate'),
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'map',
        name:'map',
        component: () => import('@/views/map'),
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'echarts',
        component: () => import('@/components/echarts/echartsFull'),
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'element',
        name:'element',
        component: () => import('@/views/element'),
      }
    ]
  },
]

export default new  VueRouter({
    mode: 'history',
    routes:router2
})