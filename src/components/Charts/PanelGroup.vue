<template>
    <el-row class="panel-group" :gutter="40">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel"  @click="handleSetLineChartData('newVisitis')">第一局</div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('messages')">第二局</div>
            </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel"  @click="handleSetLineChartData('purchases')">第三局</div>
            </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel"  @click="handleSetLineChartData('shoppings')">第四局</div>
            </el-col>   
    </el-row>
</template>
<script>
export default {
    methods:{
        handleSetLineChartData(type){
            // 子组件向父组件传值：自定义事件，this.$emit
            this.$emit('handleSetLineChartData',type);
        }
    }
};
</script>

<style scoped>
.card-panel-col {
  margin-bottom: 32px;
}
.card-panel {
  height: 108px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}
</style>

