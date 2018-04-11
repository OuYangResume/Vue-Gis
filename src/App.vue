<template>
  <div id="app" class="container-fluid ">
    
<router-link  to="/">Users</router-link>
     <router-link  to="/test">Test</router-link> 
 
 <router-link  to="/Translate">在线翻译</router-link> 
          <router-link  to="/map">地图</router-link>
          <router-link  to="/echarts">echarts</router-link>
     <router-view></router-view>

     </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>

</style>
