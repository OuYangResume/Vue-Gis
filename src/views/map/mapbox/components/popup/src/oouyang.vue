<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-17 16:11:16
 * @LastEditTime: 2019-10-17 16:51:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <button @click="updateName">{{name}}</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "oouyang"
    };
  },
  methods: {
    updateName() {
      this.name ="adsf";
    }
  }
};
</script>
