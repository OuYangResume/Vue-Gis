<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-17 16:11:16
 * @LastEditTime: 2019-12-18 22:29:05
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    {{count}}
    <button @click="updateName">{{name}}</button>
    <button @click="jianCount">jian</button>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      name: "oouyang"
    };
  },
  props: ["count", "addpop", "jianpop"],
  computed: mapState(["impData"]),
  methods: {
    updateName() {
      this.name = "adsf";
      let countsum = this.count + 2;
      console.log(this.$store.state.impData);
      console.log(this.impData)
      this.addpop(this.name, countsum);
    },
    jianCount() {
      this.jianpop(this.name);
    }
  }
};
</script>
