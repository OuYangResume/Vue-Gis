<template>
  <div>websocket
      <div>{{name}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        name:""
    };
  },
  mounted() {
      this.initSocket();
  },
  methods: {
    initSocket() {
        let vm =this;
      let socket = new WebSocket("ws://localhost:8085");
      //当连接成功之后就会执行回调函数
      socket.onopen = function() {
        console.log("客户端连接成功");
        //再向服务 器发送一个消息
        socket.send("hello"); //客户端发的消息内容 为hello
      };
      //绑定事件是用加属性的方式
      socket.onmessage = function(event) {
        vm.name=event.data;
        console.log("收到服务器端的响应", event.data);
      };
    }
  }
};
</script>
