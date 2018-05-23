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
      default: "350px"
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
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
//   实例销毁之前调用。在这一步，实例仍然完全可用
  beforeDestroy() {
    // 销毁实例
    this.chart.dispose();
    this.chart = null;
  },
  watch: { //侦听chartData属性。如果变化就执行setOptions()
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    setOptions({ KDA, CTL } = {}) {
      let option={
        xAxis: {
          data: ["德玛", "亚索", "瑞文", "盲僧", "卡萨", "妖姬", "提莫"],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: [
        {
            type: 'value',
            name: 'KDA',
            min: 3,
            max: 15,
            interval: 3,
        },
        {
            type: 'value',
            name: '参团率',
            min: 20,
            max: 100,
            interval: 20,
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
        legend: {
          data: ["KDA", "参团率"]
        },
        series: [
          {
            name: "KDA",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",
            data: [9, 12, 8.5, 12, 10, 7.5, 10],
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "参团率",
            smooth: true,
            type: "line",
            yAxisIndex:1,
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: [80, 82, 91, 50, 45, 70, 80],
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          }
        ]
      };
      this.chart.setOption({
        xAxis: {
          data: ["德玛", "亚索", "瑞文", "盲僧", "卡萨", "妖姬", "提莫"],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: [
        {
            type: 'value',
            name: 'KDA',
            min: 3,
            max: 15,
            interval: 3,
        },
        {
            type: 'value',
            name: '参团率',
            min: 20,
            max: 100,
            interval: 20,
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
        legend: {
          data: ["KDA", "参团率"]
        },
        series: [
          {
            name: "KDA",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",
            data: KDA,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          },
          {
            name: "参团率",
            smooth: true,
            type: "line",
            yAxisIndex:1,
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: CTL,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          }
        ]
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    }
  }
};
</script>