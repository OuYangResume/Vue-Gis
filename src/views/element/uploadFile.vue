<template>
  <div class="newSeo">
    <div class="newSeo-main">
      <div class="pc-left" id="pc-left">
        <div class="pc-list">
          <button @click="leftNavHidden('pc-left','pc-right')">改变</button>
          <div>
            树形选择：
            <tree-Info ref="treeEventtype" :treeOptionsData="treeOptions.data" :treeOptionsValue="treeOptions.value" :isActive="treeOptions.isActive"></tree-Info>
          </div>

          
        </div>
      </div>
      <div class="pc-right" id="pc-right">
        <div class="pc-list">you</div>
      </div>
    </div>

  </div>
</template>

<script>
import treeInfo from "@/components/TreeInfo/treeInfo";
import axios from "axios";
export default {
    components: {
        treeInfo
    },
    data() {
        return {
            name: "文件上传",
            treeOptions: {
                //树形公共组件传参
                data: null,
                isActive: false,
                value: null
            }
        };
    },
    mounted(){
      var vm= this;
      vm.setEventType();

    },
    methods: {
       //事件类型赋值
    setEventType(){
      var vm = this;
      vm.getEventType().then(response => {
        vm.treeOptions.data = response;
        vm.treeOptions.isActive = true;
        //console.log(vm.treeOptions);
      })
    },
    }
};
</script>

<style lang="scss" scoped="">
@import "@/assets/scss/element/upload.scss";
</style>