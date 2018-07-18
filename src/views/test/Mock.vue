<template>
  <div class="canvas-container">
    <el-row :gutter="30">
      <el-col :span="24" class="canvas-head">
        <h1>{{canvas}}</h1>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :span="12">
        <div class="canvas-main">
          <canvas id="canvas" width="600" height="400"></canvas>
        </div>

      </el-col>
      <el-col :span="12">
        <el-button type="primary" round v-on:click='getDate'>Mock获取数据</el-button>
        <ul>
          <li v-for="item in mack.list">{{item.id}}</li>
        </ul>
        {{mack.string}}
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :span="8">
        <div class="canvas-main">
          <canvas id="canvas1" width="600" height="420"></canvas>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="canvas-main">
          <canvas id="canvas2" width="600" height="420"></canvas>
        </div>
      </el-col>
      <el-col :span="8">
        6
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :span="24">
        <div class="canvas-main">
          <canvas id="PointInPath"></canvas>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Mock from "mockjs";
export default {
  data() {
    return {
      name: "随机生成数据",
      canvas: "canavas页面",
      mack: {
        list: [],
        string: ""
      }
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
      this.mack.list = data.list;
      console.log(data);
      this.mack.string = data.string;
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
    },
    canvas1: function() {
      let canvas1 = document.getElementById("canvas1");
      var context = canvas1.getContext("2d");
      // context.beginPath();
      // context.moveTo(10, 10);
      // context.lineTo(210, 210);
      // context.lineTo(10, 410);
      // context.closePath();
      // context.lineWidth = 5;
      //添加渐变线
      var grd = context.createLinearGradient(10, 210, 410, 210);
      //添加颜色断点
      grd.addColorStop(0, "olive");
      grd.addColorStop(0.25, "maroon");
      grd.addColorStop(0.5, "aqua");
      grd.addColorStop(0.75, "fuchsia");
      grd.addColorStop(0.25, "teal");
      // context.strokeStyle = grd; //边颜色
      // context.fillStyle = "yellow"; //填充颜色
      // context.stroke(); //描边
      // context.fill();
      DrawLine(context, 10, 10, 200, 400, 5, grd, "yellow");
      DrawLine(context, 215, 10, 200, 400, 5, "#AA394C", grd);
      context.beginPath();
      context.arc(480, 210, 50, Math.PI * 1 / 2, Math.PI * 2, false);
      context.closePath();
      context.lineWidth = 3;
      context.strokeStyle = "red";
      context.fillStyle = "yellow";
      context.stroke();
      context.fill();

      function DrawLine(
        ctx,
        x,
        y,
        width,
        heigt,
        borderWith,
        strokeColor,
        fillColor
      ) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, (y + heigt) / 2);
        ctx.lineTo(x, y + heigt);
        ctx.closePath();
        ctx.lineWidth = borderWith;
        ctx.strokeStyle = strokeColor; //边颜色
        ctx.fillStyle = fillColor; //填充颜色
        ctx.stroke(); //描边
        ctx.fill(); //填充
      }
    },
    canvas2: function() {
      var canvas2 = document.getElementById("canvas2");
      var context = canvas2.getContext("2d");
      drawRoundRect(context, 50, 50, 400, 300, 50);
      function drawRoundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.arc(
          x + radius,
          y + radius,
          radius,
          Math.PI,
          Math.PI * 3 / 2,
          false
        );
        ctx.lineTo(x + width - 2 * radius, y);
        ctx.arc(
          x + width - radius,
          y + radius,
          radius,
          Math.PI * 3 / 2,
          Math.PI * 2,
          false
        );
        ctx.lineTo(x + width, y + height - radius);
        ctx.arc(
          x + width - radius,
          y + height - radius,
          radius,
          0,
          Math.PI * 1 / 2,
          false
        );
        ctx.lineTo(x + radius, y + height);
        ctx.arc(
          x + radius,
          y + height - radius,
          radius,
          Math.PI * 1 / 2,
          Math.PI,
          false
        );
        ctx.closePath();
        var grd = ctx.createLinearGradient(100, 50, 100, 450);
        grd.addColorStop(0.25, "#FD0");
        grd.addColorStop(0.5, "#09F");
        grd.addColorStop(0.75, "#6C0");
        grd.addColorStop(1, "#FFF");
        ctx.strokeStyle = "red";
        ctx.fillStyle = grd;
        ctx.stroke();
        ctx.fill();
      }
    },
    PointInPath: function() {
      var balls = [];
      var canvas = document.getElementById("PointInPath");
      var context = canvas.getContext("2d");
      canvas.width = 1600;
      canvas.height = 800;
      for (var i = 0; i < 50; i++) {
        var aBall = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 50 + 20
        };
        balls[i] = aBall;
      }

      draw();
      canvas.addEventListener("mousemove", detect);
      function draw() {
        for (var i = 0; i < balls.length; i++) {
          context.beginPath();
          context.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2);
          context.globalAlpha = 0.5;

          var R = Math.floor(Math.random() * 255);
          var G = Math.floor(Math.random() * 255);
          var B = Math.floor(Math.random() * 255);

          context.fillStyle = "rgb(" + R + "," + G + "," + B + ")";
          context.fill();
        }
      }

      function detect() {
        var x = event.clientX - canvas.getBoundingClientRect().left;
        var y = event.clientY - canvas.getBoundingClientRect().top;

        for (var i = 0; i < balls.length; i++) {
          context.beginPath();
          context.arc(balls[i].x, balls[i].y, balls[i].r, 0, Math.PI * 2);

          if (context.isPointInPath(x, y)) {
            context.fillStyle = "rgba(255,255,255,0.1)";
            context.fill();
          }
        }
      }
    }
  },
  mounted() {
    this.initDOM();
    this.canvas1();
    this.canvas2();
    this.PointInPath();
  }
};
</script>

<style scoped>
.canvas-container {
  padding: 10px;
  background-color: rgb(240, 242, 245);
  display: flex;
  flex-direction: column;
}
.canvas-head {
  display: flex;
  justify-content: center;
}
.canvas-head > h1 {
  border: 2px solid;
  border-radius: 30px;
  width: 220px;
  padding: 10px 10px 10px 29px;
  background-color: #ff9900;
  box-shadow: 6px 5px 9px #888888;
}
.canvas-main {
  background: #fff;
}
.el-row {
  margin-bottom: 20px;
}
</style>

