import Vue from 'vue'
import VueRouter from 'vue-router'

import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(VueRouter)

/* Layout */
import Layout from '../views/layout/Layout'

export const router1 = [

]

const router2 = [
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    // 控制菜单的显示隐藏
    hidden: true,
    name: '首页',
    children: [{
      path: 'dashboard',
      component: () => import("@/views/dashboard"),
    }]
  },

  {
    path: '/test',
    component: Layout,
    name: 'Test',
    redirect: '/test/test',
    meta: { title: 'vue常用功能', icon: 'example' },
    children: [
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/test/test'),
        meta: { title: 'test', icon: 'example' },
      },
      {
        path: 'axios',
        name: 'Axios',
        component: () => import("@/views/test/axios"),
        meta: { title: 'Axios', icon: 'example' },
      },
      {
        path: 'canvas',
        name: 'canvas',
        component: () => import('@/views/test/Canvas'),
        meta: {
          title: 'canvas'
        }
      },
      {
        path: 'mock',
        name: 'mock',
        component: () => import('@/views/test/Mock'),
        meta: {
          title: 'Mock'
        }
      }
    ]
  },
  {
    path: '/Translate',
    component: Layout,
    name: 'Translate',
    children: [
      {
        path: 'Translate',
        name: 'Translate',
        component: () => import('@/views/translate/translate'),
        meta: { title: '在线翻译', icon: 'example' },
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    name: 'Map',
    redirect: '/map/leaflet',
    meta: { title: 'Map地图', icon: 'example' },
    children: [
      {
        path: 'leaflet',
        name: 'leaflet',
        component: () => import('@/views/map/leaflet'),
        meta: { title: 'leaflet', icon: 'example' },
      },
      {
        path: 'draw',
        name: 'map',
        component: () => import('@/views/map/leaflet/draw'),
        meta: { title: 'draw', icon: 'example' },
      },
      {
        path: 'mapbox',
        name: 'mapbox',
        component: () => import('@/views/map/mapbox'),
        meta: { title: 'mapbox', icon: 'example' },
      },
      {
        path: 'openlayer',
        name: 'openlayer',
        component: () => import('@/views/map/openlayer'),
        meta: { title: 'openlayer' },
      },
      {
        path: 'maptalks',
        name: 'maptalks',
        component: () => import('@/views/map/maptalks'),
        meta: { title: 'maptalks' },

        
      }
      //坐标拾取组件
      // {
      //   path: 'pickup',
      //   name: 'pickup',
      //   component: () => import('@/components/Map/PickUpMap'),
      //   meta: { title: 'pickmap', icon: 'example' },
      // }
    ]
  },
  {
    path: '/echarts',
    component: Layout,
    name: 'echarts',
    redirect: '/echarts/mixChart',
    meta: { title: 'echarts', icon: 'example' },
    children: [
      {
        path: 'mixChart',
        name: 'mixChart',
        component: () => import('@/views/echarts/mixChart/index'),
        meta: { title: '混合图', icon: 'example' },
      },
      {
        path: 'barChart',
        name: 'barChart',
        component: () => import('@/views/echarts/barChart'),
        meta: { title: '柱状图', icon: 'example' },
      },
    ]
  },
  //三级路由。
  {
    path: '/element',
    component: Layout,
    name: 'element',
    redirect: '/element/elementIndex',
    meta: { title: 'element', icon: 'example' },
    children: [
      {
        path: '/element/table',
        name: 'table',
        redirect: '/element/table/basictable',
        component: () => import('@/views/element/table/index'),
        meta: { title: 'table', icon: 'example' },
        children: [
          {
            path: 'basictable',
            name: 'basictable',
            component: () => import('@/views/element/table/basictable'),
            meta: { title: '基础表格' }
          },
          {
            path: 'treetable',
            name: 'treetable',
            component: () => import('@/views/element/table/treetable'),
            meta: { title: '树表格' }
          }, {
            path: 'paginationtable',
            name: '分页',
            component: () => import('@/views/element/table/paginationtable'),
            meta: { title: '分页表格' }
          }
        ]
      },
      {
        path: 'elementIndex',
        name: 'elementIndex',
        component: () => import('@/views/element'),
        meta: { title: '饿了么', icon: 'example' },
      }, {
        path: 'uploadFile',
        name: 'upload',
        component: () => import('@/views/element/uploadFile'),
        meta: { title: '上传组件' }
      }
    ]
  },
  // {
  //   path: '/element',
  //   component: Layout,
  //   name:'element',
  //   redirect:'/element/elementIndex',
  //   meta: { title: 'element', icon: 'example' },
  //   children: [
  //     {
  //       path: 'elementIndex',
  //       name:'elementIndex',
  //       component: () => import('@/views/element'),
  //       meta: { title: '饿了么', icon: 'example' },
  //     },
  //     {
  //       path: 'basictable',
  //       name:'basictable',
  //       component: () => import('@/views/element/table/basictable'),
  //       meta: { title: '基础表格'}
  //     },
  //     {
  //       path: 'treetable',
  //       name:'treetable',
  //       component: () => import('@/views/element/table/treetable'),
  //       meta: { title: '树表格'}
  //     },
  //   ]
  // },
]

export default new VueRouter({
  //mode: 'history',
  routes: router2
})