<template>
    <div class="container">
        <barchart-data v-on:SetBarChartData="selectBarData"></barchart-data>
        <barchart-map v-bind:chart-data="barChartData"></barchart-map>
    </div>
</template>
<script>
import barchartData from "./components/barchartData";
import barchartMap from "./components/barchartMap";
import store from "@/vuex/store";
export default {
  name: "BarIndex",
  store,
  components: {
    barchartData,
    barchartMap
  },
  data() {
    return {
        barChartData:this.$store.state.echartData.day
    };
  },
  mounted() {
  
  },
  methods:{
      selectBarData(type){
          this.barChartData=this.$store.state.echartData[type];
      }
  }
};
</script>

<style scoped>
.container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
}
</style>

