<template>
    <div>
        <p> 初次遇见 {{name}}</p>

        <!-- 添加用户信息 -->
      <form v-on:submit="addUser">
          <input type="text" v-model="newUser.name" placeholder="Enter name">
          <input type="text" v-model="newUser.email" placeholder="Enter eamil">
          <input type="submit" value="Submit">
      </form>
        <!-- 展示用户信息 -->
        <ul>
            <li v-for="user in users ">
              <input type="checkbox" class="toggle" v-model="user.contacted">
              <span :class="{contacted:user.contacted}">
                    {{user.name}}:{{user.email}}:{{user.phone}}
              <button v-on:click="deleteUser(user)">X</button>
              </span>
              </li>
        </ul>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      name: "axios",
      posts2: null,
      posts1: null,
      newUser:{},
    };
  },
  methods: {
    addUser:function(e){
          this.users.push({
              name:this.newUser.name,
              email:this.newUser.email,
              contacted:false
          });
          e.preventDefault();
      },
      deleteUser:function(user){
          this.users.splice(this.users.indexOf(user),1);
      }
  },
  // 实例创建之后调用，一般获取数据
  created: function() {
    // 获取一个请求的数据
    axios
      .get("http://jsonplaceholder.typicode.com/posts/1")
      .then(response => {
        this.post1 = response.data;
      })
      .catch(error => {
        console.log("axios==" + error);
      });
    //同时获取多个请求的数据
    function getUserData() {
      return axios.get("http://jsonplaceholder.typicode.com/users");
    }
    function getPostData() {
      return axios.get("http://jsonplaceholder.typicode.com/posts/2");
    }
    axios.all([getPostData(), getUserData()]).then(
      axios.spread((post, user) => {
        //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
        // console.log(post,user);
        this.users = user.data;
        // console.log(this.users);
      })
    );
  },

  mounted() {}
};
</script>

<style scoped>
    .contacted{
        text-decoration: line-through;
    }
</style>

