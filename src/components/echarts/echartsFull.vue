<template>
  <div id="echartsFull" class="row">
      <div  class="col-md-2">
          <span @click="select('day')" class="block" >日</span>
          <span @click="select('week')" class="block" >周</span>
          <span @click="select('month')" class="block" >月</span>
        </div>
      <echartsMap :impChartData="impData" :setChartData="setData"></echartsMap>
  </div>
</template>

<script>
import EchartsMap from "./echartsMap";
export default {
  name: "echartsFull",
  props: ['echartData'],
  data() {
    return {
      positiveType:"day",
      newechartData:null,
      impData:null,
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
  methods: {
    // "getEchartsData1":function(text){
    //     this.getEchartsData=text;
    // }
     select(type) {
        this.positiveType = type;
        this.impData = this.newechartData[type];
        // console.log(this.impData)
      }
  },
 created(){
    this.newechartData=this.echartData;
  },
   components: {
    EchartsMap
  },
};
</script>

<style>

</style>

