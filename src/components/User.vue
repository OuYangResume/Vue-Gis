<template>
  <div class="user">
      <h1>Users</h1>
      <!-- 添加用户信息 -->
      <form v-on:submit="addUser">
          <input type="text" v-model="newUser.name" placeholder="Enter name">
          <input type="text" v-model="newUser.email" placeholder="Enter eamil">
          <input type="submit" value="Submit">
      </form>
      <!-- 展示用户信息 -->
      <ul>
          <li v-for="user in users">
              <input type="checkbox" class="toggle" v-model="user.contacted">
              <span :class="{contacted:user.contacted}">
                    {{user.name}}:{{user.email}}
              <button v-on:click="deleteUser(user)">X</button>
              </span>
              </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      users: [
        {
          name: "zhangsan",
          email:"zhangsna@qq.com",
          contacted:false
        },
        {
          name: "lisi",
          email:"lisi@qq.com",
          contacted:false
        },
        {
          name: "wangwu",
          email:"wangwu@qq.com",
          contacted:false
        }
      ],
      newUser:{}
    };
  },
  methods: {
      addUser:function(e){
          console.log("hello");
          this.users.push({
              name:this.newUser.name,
              email:this.newUser.email,
              contacted:false
          });
          e.preventDefault();
      },
      deleteUser:function(user){
          console.log("user")
          this.users.splice(this.users.indexOf(user),1);
      }
  }
};
</script>

<style scoped>
    .contacted{
        text-decoration: line-through;
    }
</style>
