<template>
    <div class="app-wrapper">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar></navbar>
            <div>
                <router-view></router-view>
            </div>
            
        </div>
    </div>
     
</template>

<script>
import { Navbar,Sidebar } from '@/views/layout/components'
export default {
  name: "layout",
  components:{
      Navbar,Sidebar
  }
};
</script>
<style lang="">
    .app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
 .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: 180px;
  }
  .sidebar-container {
    transition: width .28s;
    width: 180px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
        background-color: #304156;
  }
  
</style>
