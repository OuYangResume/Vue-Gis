<template>
  <div id="echartsFull" class="row">
      <!-- <div  class="col-md-2">
          <span @click="select('day')" class="block" >日</span>
          <span @click="select('week')" class="block" >周</span>
          <span @click="select('month')" class="block" >月</span>
        </div> -->
      <echartData></echartData>
      <echartsMap></echartsMap>
  </div>
</template>

<script>
import echartData from "./echartsData"
import echartsMap from "./echartsMap"
export default {
  name: "echartsFull",
 
  data() {
    return {
      
    };
  },
  methods: {
    // "getEchartsData1":function(text){
    //     this.getEchartsData=text;
    // }
    
  },
 created(){
   
  },
   components: {
    echartsMap,echartData
  },
};
</script>

<style>

</style>

