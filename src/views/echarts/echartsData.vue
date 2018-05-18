<template>
  <div id="echartsData" class="col-md-2"> 
          <span @click="$store.commit('select','day')" class="block" >日</span>
          <span @click="$store.commit('select','week')" class="block" >周</span>
          <span @click="$store.commit('select','month')" class="block" >月</span>
      {{$store.state.count}}-- {{echartData.day.xData[0]}}
    
      <button v-on:click="$store.commit('add',10)">+</button>
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
     positiveType:"day",
      setData: {
          xAxisColor: '#B03A5B',
          lineColor: '#60C0DD',
          grid: {
              y: 45,
              x2: 40,
              y2: 90,
              x: 60
          }
        }
    };
  },
  methods:{
    
 },
  computed:{
    ...mapState({
    count:state=>state.count,
    echartData:state=>state.echartData,

    }),
  },
 store,

};
</script>
