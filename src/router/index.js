import Vue from 'vue'
import VueRouter from 'vue-router'

import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(VueRouter)

/* Layout */
import Layout from '../views/layout/Layout'

export const router1=[
   
]

const router2=[
  {
     path:'',
    component: Layout,
    redirect:'/dashboard',
    // 控制菜单的显示隐藏
    hidden:true,
    name:'首页',
    children:[{
      path:'dashboard',
      component:()=>import("@/views/dashboard"),
    }]
  },

  {
    path: '/test',
    component: Layout,
    name: 'Test',
    redirect:'/test/test',
    meta: { title: 'vue常用功能', icon: 'example' },
    children: [
      {
        path: 'test',
        name:'Test',
        component: () => import('@/views/test/test'),
        meta: { title: 'test', icon: 'example' },
      },
      {
        path: 'axios',
        name:'Axios',
        component: ()=>import("@/views/test/axios"),
        meta: { title: 'Axios', icon: 'example' },
      }
    ]
  },
  {
    path: '/Translate',
    component: Layout,
    name:'Translate',
    children: [
      {
        path: 'Translate',
        name:'Translate',
        component: () => import('@/views/translate/translate'),
        meta: { title: '在线翻译', icon: 'example' },
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    children: [
      {
        path: 'map',
        name:'map',
        component: () => import('@/views/map'),
        meta: { title: 'Map地图', icon: 'example' },
      }
    ]
  },
  {
    path: '/echarts',
    component: Layout,
    name:'echarts',
    meta: { title: 'echarts', icon: 'example' },
    children: [
      {
        path: 'element',
        name:'mixChart',
        component: () => import('@/views/echarts/mixChart/index'),
        meta: { title: '混合图', icon: 'example' },
      },
      {
        path: 'barChart',
        name:'barChart',
        component: () => import('@/views/echarts/barChart'),
        meta: { title: '柱状图', icon: 'example' },
      },
    ]
  },
  {
    path: '/element',
    component: Layout,
    name:'element',
    children: [
      {
        path: 'element',
        name:'element',
        component: () => import('@/views/element'),
        meta: { title: '饿了么', icon: 'example' },
      }
    ]
  },
]

export default new  VueRouter({
    mode: 'history',
    routes:router2
})