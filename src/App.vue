<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  mounted() {
    //创建indexdb数据库
    this.initIndexDB(this.initFun);
  },
  methods: {
    /**
     * @description: 初始化方法
     * @param {type}
     * @return:
     */
    initFun() {
      let vm = this;
      vm.getUploadData().then(res => {
        console.log(vm.db);
        //向对象仓库写入数据记录。通过事务完成。
        let objStore = vm.db
          .transaction(["person"], "readwrite")
          .objectStore("person");
        console.log(res);
        let data = { name: "oouyang", age: 17, id: "3" };
        //查询数据
        let getRequest = objStore.get(4);
        getRequest.onsuccess = function(event) {
          if (getRequest.result) {
            //如果存在g更新数据
            let updateRequest = objStore.put({ id: 4, ...res.data });
            updateRequest.onsuccess = function(event) {
              console.log("数据更新成功");
            };
            updateRequest.onerror = function(event) {
              console.log("数据更新失败");
            };
          } else {
            //如果不存在，写入数据
            let insertRequest = objStore.add({ id: 4, ...res.data });
            insertRequest.onsuccess = function(event) {
              console.log("数据写入成功");
            };
            insertRequest.onerror = function(event) {
              console.log("数据写入失败");
            };
          }
        };
        getRequest.onerror = function(event) {
          console.log("获取数据事务失败");
        };
      });
    },
    /**
     * @description: 获取数据
     * @param {type}
     * @return:
     */
    getUploadData() {
      let vm = this;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: "http://39.108.100.163:8082/upload/getUploadByLimit"
        })
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  destroyed() {
    if (this.db) {
      this.db.close();
      console.log("断开连接缓存数据库！");
    }
  }
};
</script>

<style>
</style>
