<template>
    <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";
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
      default: "650px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    // 接受父组件传递的值
    chartData: {
      type: Object
    }
  },
  mounted() {
    console.log(this.chartData);
    this.initChart();
  },
  watch: {
    //侦听chartData属性。如果变化就执行setOptions()
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  beforeDestroy() {
    // 销毁实例
    this.chart.dispose();
    this.chart = null;
  },
  data() {
    return {
      chart: null
    };
  },
  methods: {
    setOptions({ xData, yData }) {
      this.chart.setOption(
        //       {
        //     title: { text: '在Vue中使用echarts' },
        //     tooltip: {},
        //     xAxis: {
        //         data:xData
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '销量',
        //         type: 'bar',
        //          data:yData
        //     }]
        //   }
        {
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: xData,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "访问量",
              type: "bar",
              barWidth: "60%",
              data: yData
            }
          ]
        }
      );
    },

    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    }
  }
};
</script>
