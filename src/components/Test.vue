<template>
  <div class="test">
      <!-- 获取数据 -->
      <h1> {{title}}</h1>
      <p>{{user.firstName}}</p>
      <p v-text="user.lastName"></p>

      <!-- v-if -->
      <p v-if="showName">{{user.firstName}}</p>
      <p v-else>NObody</p>

      <!-- v-for -->
        <ul>
            <li v-for="item in items">{{item.title1}}</li>
        </ul>

        <!-- v-on -->
        <button v-on:click="greet('hello everbodys!')">buy Greet</button>

        <!-- 键盘事件 -->
        <input type="text" v-on:keyup="pressKey" v-on:keyup.enter="enterHit">
        <hr>
        <!-- computed 计算属性 -->
        <label for="">First Name:</label>
        <input type="text" v-model="user.firstName">
        <br>
        <label for="">Last Name:</label>
        <input type="text" v-model="user.lastName">
        <br>
        <h1>{{fullName}}</h1>

        <!-- props 属性-->
        <h2>{{msg}}</h2>
  </div>
</template>
<script>
export default {
  name: "test",
  props: {
    msg: {
      type: String,
      default: "默认值"
    }
  },
  data() {
    return {
      title: "hello vue",
      user: {
        firstName: "ouyang",
        lastName: "xiaogao"
      },
      showName: false,
      items: [{ title1: "asdf1" }, { title1: "asdf2" }, { title1: "asdf3" }]
    };
  },
  methods: {
    greet: function(e) {
      alert(e);
    },
    pressKey: function() {
      console.log("Pressed...");
    },
    enterHit: function() {
      console.log("enterHit...");
    }
  },
  computed: {
    fullName: function() {
      return this.user.firstName + "" + this.user.lastName;
    }
  }
};
</script>
<style scoped>

</style>

