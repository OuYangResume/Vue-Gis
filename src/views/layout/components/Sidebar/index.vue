<template>
<div>
  <el-menu
      mode="vertical" 
      :show-timeout="200"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
</div>
       
</template>

<script>
import SidebarItem from "./SidebarItem";
export default {
  components: { SidebarItem },
  computed: {
    routes() {
      return this.$router.options.routes;
    }
  },
  mounted() {
    console.log(this.routes);
  },
  methods: {}
};
</script>