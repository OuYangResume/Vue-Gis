<template>
    <div class="mapinfowin">
            <div class="head">{attri.type}<div class="close">X</div></div>
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
    name:'demo'
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


