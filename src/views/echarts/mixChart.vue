 <template>
    <div class="chart-container">
        <chart height='100%' width='100%'></chart>   
    </div>
 </template>
    <script>
    import Chart from '@/components/Charts/mixChart'
   export default {
    name: 'mixChart',
    components :{Chart}
}
 
</script>
<style>
.chart-container{
    height: 85vh;
}
</style>



