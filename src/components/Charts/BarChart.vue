<template>
    <div :class="className" id="bar" :style="{height:height,width:width}"></div>
</template>
<script>
// import echarts from "echarts";
// require('echarts/theme/macarons') // echarts theme

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
        let echarts=require('echarts');
      this.chart = echarts.init(document.getElementById("bar"),'macarons');
      this.chart.setOption({
    title: {
        text: '输出与承受占比图',
        subtext: 'by ouyang'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['伤害', '防御'],
        x : 'right',
        y : 'top',
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['德玛','瑞文','亚索','盲僧','卡萨']
    },
    series: [
        {
            name: '伤害',
            type: 'bar',
            data: [10000, 12000, 18000, 4399, 22000]
        },
        {
            name: '防御',
            type: 'bar',
            data: [19325, 9000, 8000, 16000, 6000]
        }
    ]
});
    }
  },
  mounted(){
      this.initChart()
  }
};
</script>
