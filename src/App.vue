<template>
  <div id="app" class="container-fluid ">
    <div class="col-md-12">
        <router-link to="/">Users</router-link>|
          <router-link to="/test">Test</router-link>|
          <router-link to="/Translate">在线翻译</router-link>
          <router-link to="/map">地图</router-link>
    </div>
     <router-view></router-view>
     </div>
</template>

<script>

export default {
  name: "App",
  components: {
   
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
