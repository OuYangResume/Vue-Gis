<template>
    <div>
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar></navbar>
            <router-view></router-view>
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
    
</style>
