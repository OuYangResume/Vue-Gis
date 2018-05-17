<template>
         
  <el-form ref="form"  label-width="80px">
     <el-form-item label="翻译内容">
            <el-input v-model="textToTranslate" prefix-icon="el-icon-search" placeholder="输入需要翻译的内容" clearable></el-input>
      </el-form-item>
      <el-form-item label="翻译语言">
            <el-select v-model="language" placeholder="请选择">
            <el-option
               v-for="item in options"
               :key="item.value"
               :label="item.label"
              :value="item.value">
            </el-option>
         </el-select>
        </el-form-item>
          <el-button type="primary" @click="formSubmit">立即翻译</el-button>
        </el-form-item>
</el-form>
   
</template>
<script>
export default {
  name: "translateForm",
  data() {
    return {
      textToTranslate: "",
      language: "en",
      options: [{
          value: 'en',
          label: 'English'
        }, {
          value: 'ja',
          label: 'Japanese'
        }, {
          value: 'hy',
          label: 'Armenian'
        }, {
          value: 'ru',
          label: 'Russian'
        }],
    };
  },
  methods: {
    formSubmit: function(e) {
      //alert(this.textToTranslate);
      this.$emit("formSubmit1", this.textToTranslate, this.language); //注册事件
      e.preventDefault();
    },
    clearText(){
      alert(this.textToTranslate)
    }
  }
};
</script>
<style scoped>
   
</style>

