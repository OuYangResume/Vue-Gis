<template>
    <div>
        {{name}}
        <button v-on:click='getDate'>打印数据</button>
        <br>
        <canvas id="canvas" width="800" height="500"></canvas>
    </div>
</template>

<script>
import Mock from "mockjs";
export default {
  data() {
    return {
      name: "随机生成数据"
    };
  },
  methods: {
    getDate: function() {
      var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        "list|1-10": [
          {
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            "id|+1": 1
          }
        ],
        "string|1-10": "★"
      });
      // 输出结果
      console.log(JSON.stringify(data, null, 4));
    },
    initDOM: function() {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      ctx.fillStyle = "green";
      ctx.fillRect(25, 25, 100, 100);
      ctx.clearRect(45, 45, 60, 60);
      ctx.strokeRect(50, 50, 50, 50);

      ctx.beginPath();
      ctx.moveTo(175, 150);
      ctx.lineTo(200, 175);
      ctx.lineTo(200, 125);
      ctx.fill();

      // 画背景
      ctx.fillStyle = "#FD0";
      ctx.fillRect(200, 200, 75, 75);
      ctx.fillStyle = "#6C0";
      ctx.fillRect(275, 200, 75, 75);
      ctx.fillStyle = "#09F";
      ctx.fillRect(200, 275, 75, 75);
      ctx.fillStyle = "#F30";
      ctx.fillRect(275, 275, 75, 75);
      ctx.fillStyle = "#FFF";

      // 设置透明度值
      ctx.globalAlpha = 0.2;

      // 画半透明圆
      for (var i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.arc(275, 275, 10 + 10 * i, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }
  },
  mounted() {
    this.initDOM();
  }
};
</script>
