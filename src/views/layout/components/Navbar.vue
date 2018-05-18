<template>
    <el-menu class="navbar" mode="horizontal">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
           
        </el-breadcrumb> -->

         <el-breadcrumb class="app-breadcrumb" separator="/">
            <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
            <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
            <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
            </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </el-menu>
</template>

<script>
    export default{
        created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
    //   console.log(matched);
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/user', meta: { title: 'User' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
    }
</script>

<style scoped>
    .navbar{
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
            border-right: none;
    border-bottom: solid 1px #e6e6e6;
        list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    }
</style>



