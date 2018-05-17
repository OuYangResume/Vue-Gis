<template>
     <div>
         <navbar></navbar>
         <router-view></router-view>
     </div>
</template>

<script>
import { Navbar } from '@/views/layout/components'
export default {
  name: "layout",
  components:{
      Navbar
  }
};
</script>
