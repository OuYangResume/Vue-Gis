<template>
    <div>
        {{name}}
        <form>
            <input type="file" @change="getFile($event)">
            <button class="button button-primary button-pill button-small" @click="submit($event)">提交</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "文件上传",
      file: ""
    };
  },
  methods: {
    getFile: function(event) {
      console.log(event);
      this.file = event.target.files[0];
    },
    submit: function(event) {
      //阻止元素发生默认的行为
      event.preventDefault();
      let formData = new FormData();
      formData.append("file", this.file);
      axios({
        method: "POST",
        url: "http://localhost:8888/upload",
        data: formData
      })
        //   axios
        //     .post("http://localhost:8888/upload", formData)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
