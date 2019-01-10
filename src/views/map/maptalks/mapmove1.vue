<template>
  <div>
    <div id="map"></div>
    <div v-on:click="open">开始</div>
    <div @click="suspended">暂停</div>
    <div @click="continued">继续</div>
    <div @click="close">清除</div>
    <mapinfowin v-if="windowFlag" class="dragWindow"  v-on:closeDialog='closeWindow'></mapinfowin>
  </div>
</template>
<script>
import mapinfowin from "./components/mapinfowin.vue";
import * as maptalks from "maptalks";
//import Path_Animation from "./components/mapmove.js";
import Path_Animation from "routermove";

export default {
  components: { mapinfowin },
  data() {
    return {
      map: null,
      path: null,
      markerLayer: null,
      windowFlag: false
    };
  },
  mounted() {
    this.initmap();
  },
  methods: {
    initmap() {
      var vm = this;
      vm.map = new maptalks.Map("map", {
        center: [111.32450763502036, 31.667512417065313],
        zoom: 8,
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate:
            "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          subdomains: ["a", "b", "c", "d"],
          attribution:
            '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
        })
      });
      vm.markerLayer = new maptalks.VectorLayer("vector1").addTo(vm.map);
      let option = {
        map: vm.map,
        lineData: [
          [111.32450763502036, 31.667512417065313],
          [113.32450763502036, 33.667512417065313],
          [114.32450763502036, 31.667512417065313],
          [114.32450763502036, 36.667512417065313],
          [116.32450763502036, 35.667512417065313]
        ],
        speed: 2,
        isLineShow: false
      };
      vm.path = new Path_Animation(option);
      vm.addMakerLayer();
    },
    createInfoWin() {
      var content = `<div class="mapinfowin">
            <div class="head" id="head">{attri.type}<div class="close">X</div></div>
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
        `;
      var options = {
        content: content,
        width: 250, //弹窗的宽度
        // dx: 250, //向左右偏移
        // dy: 50 //上下偏移
        autoOpenOn: "click", //set to null if not to open when clicking on marker
        autoCloseOn: "click"
      };
      let infoWindow = new maptalks.ui.InfoWindow(options);
      return infoWindow;
    },
    closeWindow(){
      this.windowFlag=false;
    },
    addMakerLayer() {
      var vm = this;
      let point = [111.32450763502036, 31.667512417065313];
      let geompoint = new maptalks.Marker(point, {
        id: "geompoint1"
        // symbol: {
        //   markerFile: "http://localhost:8081/static/images/mouseStyle.png",
        //   markerWidth: 20,
        //   markerHeight: 20
        // }
      }).addTo(vm.markerLayer);
      let style = {
        markerFile: "http://localhost:8081/static/images/mouseStyle.png",
        markerWidth: 29,
        markerHeight: 29,
        markerDy: -20
      };
      geompoint.setSymbol(style);
      let infoWindow = vm.createInfoWin();
      // geompoint.setInfoWindow(infoWindow).on("mousedown", vm.infoWindowClick);
      geompoint.on("click",function(e){
        vm.windowFlag = true
        vm.map.animateTo(
              {
                zoom: 10,
                center: e.target._coordinates
              },
              {
                duration: 1000,
                easing: "out"
              },
              function(frame) {
                if (frame.state.playState === "finished") {
                  console.log("animation finished");
                }
              }
            );
      })
    },

    infoWindowClick() {
      setTimeout(function() {
        const tell = document.getElementById("head");
        tell.onclick = function() {
          alert("打个电话");
        };
      }, 300);
    },
    open() {
      let lineData = [
        [111.32450763502036, 31.667512417065313],
        [113.32450763502036, 33.667512417065313],
        [114.32450763502036, 36.667512417065313],
        [116.32450763502036, 35.667512417065313]
      ];
      //this.path.setData(lineData);
      //this.path.setSpeed(4);
      let markerstyle = {
        markerFile: "http://localhost:8081/static/images/mouseStyle.png",
        markerWidth: 29,
        markerHeight: 29,
        markerDy: 15
      };
      let linestyle = {
        lineColor: "red",
        lineWidth: 6,
        lineJoin: "round", //miter, round, bevel
        lineCap: "round", //butt, round, square
        lineDasharray: null, //dasharray, e.g. [10, 5, 5]
        "lineOpacity ": 1
      };
      let style = {
        lineColor: "#fff",
        lineWidth: 3,
        lineJoin: "round", //miter, round, bevel
        lineCap: "round", //butt, round, square
        lineDasharray: null, //dasharray, e.g. [10, 5, 5]
        "lineOpacity ": 1
      };
      this.path.setMarkerStyle(markerstyle);
      // this.path.setLineStyle(linestyle);
      // this.path.setDynamicLineStyle(style)
      this.path.open();
    },
    suspended() {
      this.path.isContinued(false);
    },
    continued() {
      this.path.isContinued(true);
    },
    close() {
      this.path.close();
    }
  }
};
</script>
<style lang="scss" >
#map {
  width: 100%;
  height: 500px;
}
.maptalks-msgContent {
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
}

.dragWindow{
    position:absolute;
    left: 200px;
    top: 65px;
    z-index:300;
  }
</style>

