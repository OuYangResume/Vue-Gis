<template>
  <div id="app" class="container-fluid ">
    <div class="col-md-12">
        <router-link to="/">Users</router-link>|
          <router-link to="/test">Test</router-link>|
          <router-link to="/Translate">在线翻译</router-link>
    </div>
     <router-view></router-view>
     </div>
</template>

<script>
import Test from "./components/test";
import User from "./components/user";
export default {
  name: "App",
  components: {
    Test,
    User
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
