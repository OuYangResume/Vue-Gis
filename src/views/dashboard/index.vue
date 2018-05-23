<template>
    <div class="dashboard-container">
        <!-- @handleSetLineChartData接受子组件的方法 -->
        <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>

        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <!-- :chart-data向子组件传递值 -->
            <line-chart v-bind:chart-data="lineChartData"></line-chart>
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
    KDA: [9, 12, 8.5, 12, 10, 7.5, 10],
    CTL: [80, 82, 91, 50, 45, 70, 80]
  },
  messages: {
    KDA: [10, 13, 12, 12, 9, 9.5, 9],
    CTL: [45, 68, 60, 90, 60, 60, 90]
  },
  purchases: {
    KDA: [12, 12, 8.5, 12, 9, 8.5, 10],
    CTL: [63, 82, 80, 60, 85, 60, 63]
  },
  shoppings: {
    KDA: [6, 8.5, 8.5, 10, 10, 12, 8],
    CTL: [70, 82, 85, 60, 75, 53, 75]
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

