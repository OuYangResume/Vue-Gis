<template>
  <div class="test">
    <!-- 获取数据 -->
    <h1 class="radius">{{title}}</h1>
    <p class="box-shadow">{{user.firstName}}</p>
    <p class="transform" v-text="user.lastName"></p>

    <!-- v-if -->
    <p v-if="showName">{{user.firstName}}</p>
    <p v-else>NObody</p>

    <!-- v-for -->
    <ul>
      <li class="transition" v-for="item in items">{{item.title1}}</li>
    </ul>

    <!-- v-on -->
    <button v-on:click="greet('hello everbodys!')">buy Greet</button>

    <!-- 键盘事件 -->
    <input type="text" v-on:keyup="pressKey" v-on:keyup.enter="enterHit">

    <!-- computed 计算属性 -->
    <label for="">First Name:</label>
    <input type="text" v-model="user.firstName">
    <br>
    <label for="">Last Name:</label>
    <input type="text" v-model="user.lastName">
    <br>
    <h1>{{fullName}}</h1>

    <!-- props 属性-->
    <div class="animation">{{msg}}</div>
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
  //计算属性
  computed: {
    fullName: function() {
      return this.user.firstName + "" + this.user.lastName;
    }
  }
};
</script>
<style scoped>
.radius {
  text-align: center;
  width: 200px;
  background: #dddddd;
  border: 2px solid;
  /* 圆角属性 */
  border-radius: 25px;
}
.box-shadow {
  width: 200px;
  height: 50px;
  background-color: #ff9900;
  text-align: center;
  font-size: 25px;
  /* 边框阴影 上下，左右，模糊度，阴影颜色*/
  box-shadow: 6px 5px 9px #888888;
  /* 文本阴影 */
  text-shadow: 2px 2px 3px #000;
}
.transform {
  width: 200px;
  height: 50px;
  background-color: yellow;
  /* 转换 */
  transform: rotate(9deg);
}
.transition {
  list-style-type: none;
  width: 200px;
  height: 50px;
  background-color: #aaa;
  margin: 10px -30px;
  text-align: center;
  font-size: 30px;
  /* 过度 */
  transition: width 1s, height 2s, transform 2s, background-color 2s;
}
.transition:nth-child(1):hover {
  width: 250px;
  background-color: #ff9900;
  transform: translate(20px, 40px);
}
.transition:nth-child(2):hover {
  height: 80px;
  transform: skew(10deg, 0deg);
}
.animation {
  background-color: #aaa;
  width: 250px;
  height: 50px;
  /* 动画 */
  animation: myfirst 5s;
}
@keyframes myfirst {
  0% {
    background: red;
  }
  25% {
    background: yellow;
  }
  50% {
    background: blue;
  }
  100% {
    background: green;
  }
}
</style>

