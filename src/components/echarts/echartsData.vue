<template>
  <div id="echartsData"> 
      {{$store.state.count}}--{{count}}
      <router-view :echartData="echartData"></router-view>
      <button v-on:click="$store.commit('add')">+</button>
      <button v-on:click="$store.commit('reduce')">-</button>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState } from 'vuex';
export default {
  name: "echartsData",
  data() {
    return {
     
    };
  },
  created(){
    //  this.$http.get("../../../static/data/echartData.json").then(response => {
    //   console.log(response.body);
    //   this.echartData=response.body;
    // });
  },
  computed:{
    ...mapState({
    count:state=>state.count
    }),
    
  },
 store,
};
</script>
