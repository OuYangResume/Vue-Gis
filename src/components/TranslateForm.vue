<template>
          <div class="row" id="translateForm">
         <form class=" form-inline" v-on:submit="formSubmit" id="transFrom">  
          <input type="text" class="form-control col-md-5" v-model="textToTranslate" placeholder="输入需要翻译的内容">
          <select class="form-control" v-model="language">
              <option value="en">English</option>
              <option value="ja">Japanese</option>
              <option value="hy">Armenian</option>
              <option value="ru">Russian</option>
          </select>
          <input class="btn btn-primary" type="submit" value="翻译">
      </form>
     </div>

</template>
<script>
export default {
  name: "translateForm",
  data() {
    return {
      textToTranslate: "",
      language: "en"
    };
  },
  methods: {
    formSubmit: function(e) {
      //alert(this.textToTranslate);
      this.$emit("formSubmit1", this.textToTranslate, this.language); //注册事件
      e.preventDefault();
    }
  }
};
</script>
<style scoped>
    #transFrom{
        border: 1px #ccc solid;
        border-radius: 10px;
    }
</style>

