<template>
    <div class="dashboard-container">
        <!-- @handleSetLineChartData接受子组件的方法 -->
        <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <!-- :chart-data向子组件传递值 -->
            <line-chart :chart-data="lineChartData"></line-chart>
        </el-row>

        <el-row :gutter="32">
            <el-col :xs="24" :sm="24" :lg="8">
            <div class="chart-wrapper">
                <raddar-chart></raddar-chart>
            </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <pie-chart></pie-chart>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                <bar-chart></bar-chart>
                 </div>
            </el-col>
        </el-row>
    </div>
</template>
 <script>
    import panelGroup from '@/components/Charts/PanelGroup'
    import lineChart from '@/components/Charts/LineChart'
    import raddarChart from '@/components/Charts/RaddarChart'
    import pieChart from '@/components/Charts/PieChart'
    import barChart from '@/components/Charts/BarChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
    export default{

        components:{
            panelGroup,lineChart,raddarChart,pieChart,barChart
        },
        data() {
         return {
            lineChartData: lineChartData.newVisitis
             }
        },
        methods: {
            handleSetLineChartData(type) {
            this.lineChartData = lineChartData[type];
            console.log(type);
        },
        mounted () {
            //测试子元素传递过来的type
            this.handleSetLineChartData();
        }
     }
    }
</script>

 <style scoped>
.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);

}
 .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
 </style>

