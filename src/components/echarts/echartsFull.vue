<template>
  <div id="echartsFull" class="row">
      <echartsData v-on:outPutData1="getEchartsData1"></echartsData>
      <echartsMap v-text="getEchartsData"></echartsMap>
  </div>
</template>

<script>
import EchartsData from "./echartsData";
import EchartsMap from "./echartsMap";
export default {
  name: "echartsFull",
  components: {
    EchartsData,
    EchartsMap
  },
  data() {
    return {
      getEchartsData:""
    };
  },
  methods: {
    "getEchartsData1":function(text){
        this.getEchartsData=text;
    }
  },
  mounted(){
   
  }
};
</script>

<style>

</style>

