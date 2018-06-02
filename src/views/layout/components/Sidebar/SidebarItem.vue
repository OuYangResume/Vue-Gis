<template>
    <div class="menu-wrapper">
        <!-- <router-link  to="/user">Users</router-link>
        <router-link  to="/test/test">Test</router-link> 
        <router-link  to="/Translate/Translate">在线翻译</router-link> 
        <router-link  :to="{name:'map'}">地图</router-link>
        <router-link  to="/echarts/echarts">echarts</router-link>
        <router-link :to="{name:'element'}">饿了么</router-link> -->

    <!-- <template>
        <router-link v-if="routes[4].children.length===1" :to="routes[4].path+'/'+routes[4].children[0].path">
            <el-menu-item >
               <span> {{routes[4].children[0].meta.title}}</span>
            </el-menu-item>
          
        </router-link>
    </template> -->
    
    <template v-for="item in routes" v-if="!item.hidden&&item.children">

      <router-link v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
       </div>
</template>

<script>
export default {
    //这里的name起到了递归的作用
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  }
};
</script>
