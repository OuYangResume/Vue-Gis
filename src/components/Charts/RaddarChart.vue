<template>
     <div :class="className" id="raddar" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts"
require('echarts/theme/macarons') // echarts theme
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  data() {
    return {
      chart: null
    };
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("raddar"),'macarons');
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 6,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: '金钱', max: 10000 },
            { name: '击杀', max: 20000 },
            { name: '生存', max: 20000 },
            { name: '助攻', max: 20000 },
            { name: '物理', max: 20000 },
            { name: '魔法', max: 20000 },
            { name: '防御', max: 20000 },
          ]
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['德玛', '亚索', '瑞文']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: 'rgba(0,0,0,.6)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000,12000],
              name: '德玛'
            },
            {
              value: [4000, 9000, 15000, 15000, 13000, 11000,11000],
              name: '瑞文'
            },
            {
              value: [5500, 11000, 12000, 15000, 12000, 12000,9000],
              name: '亚索'
            }
          ],
          animationDuration: 3000
        }]
      });
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>