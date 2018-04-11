<template>
  <div>
     <h1 class="col-md-12">{{msg}}</h1> 
     <h5 class="text-muted col-md-12 ">简单 / 易用 / 便捷</h5>
 <translateForm  v-on:formSubmit1="translateText"></translateForm>
 <TranslateOutput v-text="translatedText"></TranslateOutput>
  </div>
</template>


<script>
    import TranslateForm from '../components/translateForm' 
    import TranslateOutput from '../components/TranslateOutput'
    export default{
        name:"translate",
        components:{
            TranslateForm,TranslateOutput
        } ,
        data(){
            return{
                msg:"在线翻译",
                translatedText:""
            }
        },
        methods:{
         translateText:function(text,language){
               // alert(text);
            this.$http.get('https://translate.yandex.net/api/v1.5/tr.json/translate'+ 
           '?key=trnsl.1.1.20180330T075042Z.c885954a8d6f7aa5.1bd4e8c92a6e1f5de4916fe520cbc6fb61f077a5'+
           '&text='+text+'&lang='+language).then((response)=>{
               //console.log(response.body.text[0]);
               this.translatedText=response.body.text[0];
           })
         }   
        }
    }
</script>