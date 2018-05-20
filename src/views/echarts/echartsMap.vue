<template>
  <div id="echartsMap">
   
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState } from 'vuex'
export default {
  name: "echartsMap",
  store,
  props: {
  
  },
  data() {
    return {
        aa:"echartsMap"
    };
  },
  methods:{
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('echartsMap'))
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                // data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                data:this.$store.state.impData.xData
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                // data: [5, 20, 36, 10, 10, 20]
                 data:this.$store.state.impData.yData
            }]
        });
    },

  },
  mounted(){
     this.drawLine();
  },
  created(){
    console.log(this.impChartData)
  },
  computed:{
    ...mapState(['echartData','impData'])
  }
};
</script>

<style>
  #echartsMap{
    height: 80vh;
  }
</style>

