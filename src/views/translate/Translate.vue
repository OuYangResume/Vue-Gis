<template>
  <div>
     <h1>{{msg}}</h1> 
     <h5>简单 / 易用 / 便捷</h5>
 <translateForm  v-on:formSubmit1="translateText"></translateForm>
 <TranslateOutput v-text="translatedText"></TranslateOutput>
  </div>
</template>


<script>
import axios from "axios";
import TranslateForm from "./translateForm";
import TranslateOutput from "./TranslateOutput";
export default {
  name: "translate",
  components: {
    TranslateForm,
    TranslateOutput
  },
  data() {
    return {
      msg: "在线翻译",
      translatedText: ""
    };
  },
  methods: {
    translateText: function(text, language) {
      axios
        .get("https://translate.yandex.net/api/v1.5/tr.json/translate", {
          params: {
            key: 'trnsl.1.1.20180330T075042Z.c885954a8d6f7aa5.1bd4e8c92a6e1f5de4916fe520cbc6fb61f077a5',
            text: text,
            lang:language
          }
        })
        .then(response=> {
            // console.log(response);
         this.translatedText=response.data.text[0];
        })
        .catch(err=>{
          console.log(err);
        });
    }
  }
};
</script>