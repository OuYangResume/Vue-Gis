<template>
  <div id="echartsData" class="col-md-2"> 
      <!-- {{echartData.day.xData[0]}} -->
      <button v-on:click="outPutData"> 生成图形</button>
  </div>
</template>

<script>
export default {
  name: "echartsData",
  data() {
    return {
        echartData:""
    };
  },
  created(){
     this.$http.get("../../../static/data/echartData.json").then(response => {
      // console.log(response.body);
      this.echartData=response.body;
    });
  },
  methods:{
    "outPutData":function(e){
        this.$emit("outPutData1", this.echartData); //注册事件
        e.preventDefault();
    }
  }
};
</script>
