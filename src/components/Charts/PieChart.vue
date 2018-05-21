<template>
     <div :class="className" id="pie" :style="{height:height,width:width}"></div>
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
      this.chart = echarts.init(document.getElementById("pie"),'macarons');
      this.chart.setOption({
        title: {
          text: "英雄属性分布图",
          subtext: "亚索",
          x: "center"
        },

        legend: {
          x: "center",
          y: "bottom",
          data: ["金钱", "击杀", "生存", "防御", "魔法", "物理", "助攻"]
        },

        calculable: true,
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [20, 110],
            roseType: "radius",
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { value: 15, name: "金钱" },
              { value: 5, name: "魔法" },
              { value: 15, name: "生存" },
              { value: 20, name: "防御" },
              { value: 25, name: "击杀" },
              { value: 20, name: "物理" }
            ]
          }
        ]
      });
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>
