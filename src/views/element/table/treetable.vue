<template>
  <!-- <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs> -->

  <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
          <!-- <tab-pane v-if='activeName==item.key' :type='item.key'></tab-pane>  -->
          {{item.label}}
      </el-tab-pane>
    </el-tabs>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      activeName2: "first",
      tabMapOptions: [
        { label: "China", key: "CN" },
        { label: "USA", key: "US" },
        { label: "Japan", key: "JP" },
        { label: "Eurozone", key: "EU" }
      ],
      activeName: "CN",
      users:[],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  // created(){
  //   axios
  //     .get("http://localhost:8888/getlist")
  //     .then(response => {
  //       this.users = response.data;
  //     })
  //     .catch(error => {
  //       console.log("axios==" + error);
  //     });
  // }
};
</script>