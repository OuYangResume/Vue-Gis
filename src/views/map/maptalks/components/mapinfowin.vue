<template>
    <div class="mapinfowin" id="head">
            <div class="head"  @mousedown.prevent="mousedown">{attri.type}<div @click="close" class="close">X</div></div>
            <div class="main">
                <div class="left">
                    <div class="title">人口总数</div>
                    <div class="number">38410</div>
                    <div class="title">诉求数</div>
                    <div class="number">379</div>
                </div>
                <div class="left">
                    <div class="title">万人投诉率</div>
                    <div class="number">11.23%</div>
                    <div class="title">主要投诉</div>
                    <div class="number">噪音污染</div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name:'demo',
    methods:{
      /**
       * 监听拖动事件
       */
       mousedown(event) {
        this.selectElement = document.getElementById("head")
        var h = document.documentElement.clientHeight; //浏览器高度
        var w = document.documentElement.clientWidth; //浏览器宽度
        var oDiv = this.selectElement
        this.selectElement.style.cursor = 'move'
        this.isDowm = true
        var disX = event.clientX - oDiv.offsetLeft
        var disY = event.clientY - oDiv.offsetTop
        var maxX = w - oDiv.clientWidth + disX;
        var maxY = h - oDiv.clientHeight + disY;
        document.onmousemove = function (ev) {
          var ev = ev || event

          if (disX >= ev.clientX) {
            //					oDiv.style.top=ev.clientY-disY+'px';
            oDiv.style.left = '0px';
          } else if (ev.clientX >= maxX) {
            oDiv.style.left = (w - oDiv.clientWidth) + 'px';
          } else {
            oDiv.style.left = ev.clientX - disX + 'px';
          }

          if (disY >= ev.clientY) {
            //					oDiv.style.left=ev.clientX-disX+'px';
            oDiv.style.top = '0px';
          } else if (ev.clientY >= maxY) {
            oDiv.style.top = (h - oDiv.clientHeight) + 'px';
          } else {
            oDiv.style.top = ev.clientY - disY + 'px';
          }
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          oDiv.style.cursor = 'default'
        }
      },
      /**
       * 关闭
       */
      close(){
          this.$emit('closeDialog')
      }
    }
}
</script>

<style lang="scss" scoped>
.mapinfowin {
    width: 250px;
    .head {
      background-color: #da4e63;
      opacity: 0.9;
      height: 30px;
      font-size: 18px;
      color: #ffffff;
      padding-left: 8px;
      line-height: 30px;
      .close {
        float: right;
        padding-right: 10px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .main {
      background-color: #fcad3c;
      display: flex;
      .left {
        width: 50%;
        padding: 10px 20px;
        .title {
          height: 25px;
          text-align: center;
          font-size: 14px;
          color: #ffffff;
        }
        .number {
          background-color: #a47128;
          border-radius: 6px;
          height: 30px;
          border: solid 1px #ffffff;
          font-size: 18px;
          color: #fffffe;
          text-align: center;
          line-height: 30px;
        }
      }
    }
  }
</style>


