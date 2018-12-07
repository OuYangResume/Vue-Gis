<template>
  <div>
    <h1>{{msg}}</h1>
    <h5>简单 / 易用 / 便捷</h5>
    <translateForm v-on:formSubmit1="translateText"></translateForm>
    <TranslateOutput v-text="translatedText"></TranslateOutput>

    <!-- <transition>
      <div class="total-error"  v-if="visible">
        <i class="material-icons" style="fontSize: 14px">error</i>
        <p>{{msg}}</p>
        <i class="material-icons toast-close-btn" style="fontSize: 14px" v-if="showClose" @click.stop="close">close</i>
      </div>
    </transition> -->
    <total :content="msg" :autoClose="true"></total>
  </div>
</template>


<script>
import axios from "axios";
import TranslateForm from "./translateForm";
import TranslateOutput from "./TranslateOutput";
import total from "@/components/common/total"
export default {
  name: "translate",
  components: {
    TranslateForm,
    TranslateOutput,
    total
  },
  data() {
    return {
      visible:true,
      closed:false,
      showClose:true,

      msg: "在线翻译",
      translatedText: "",
    };
  },
   watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    }
  },
  methods: {
    close(){
      this.closed = true;
    },
    translateText: function(text, language) {
      axios
        .get("https://translate.yandex.net/api/v1.5/tr.json/translate", {
          params: {
            key:
              "trnsl.1.1.20180330T075042Z.c885954a8d6f7aa5.1bd4e8c92a6e1f5de4916fe520cbc6fb61f077a5",
            text: text,
            lang: language
          }
        })
        .then(response => {
          // console.log(response);
          this.translatedText = response.data.text[0];
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
$primary-color: #92cc41;
$success-color: #209cee;
$warn-color: #f7d51d;
$error-color: #e76e55;
$content-font-size: 14px;
$close-btn-size: 10px;
$position-offset: 8px;
$toast-width: 250px;
$toast-height: 80px;
$border-radius-middle: 4px;
.total-error {
  position: fixed;
  top: 16px;
  right: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 16px;
  z-index: 9999;
  box-sizing: border-box;
  width: $toast-width;
  height: $toast-height;
  border-radius: $border-radius-middle;
  box-shadow: 0 2px 12px #a8abaf;
  background-color: #fff;
  user-select: none;
  color: $error-color;
  .toast-content {
    margin-left: 4px;
    max-width: $toast-width;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .toast-close-btn {
    position: absolute;
    top: $position-offset;
    right: $position-offset;
    font-size: $close-btn-size;
    color: gray;
    cursor: pointer;
  }
}
</style>
