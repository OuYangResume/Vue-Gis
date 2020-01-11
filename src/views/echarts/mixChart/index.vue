<!--
 * @Author: your name
 * @Date: 2019-01-07 09:48:49
 * @LastEditTime : 2020-01-08 17:32:29
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Vue-Gis/src/views/echarts/mixChart/index.vue
 -->
 <template>
    <div class="chart-container">
        <!-- <chart height='50%' width='100%'></chart> -->
        <MapChart height='100%' width='100%'></MapChart>   
    </div>
 </template>
    <script>
    import Chart from '@/components/Charts/mixChart'
    import MapChart from '@/components/Charts/MapChart'
   export default {
    name: 'mixChart',
    components :{Chart,MapChart}
}
 
</script>
<style>
.chart-container{
    height: 85vh;
}
</style>



