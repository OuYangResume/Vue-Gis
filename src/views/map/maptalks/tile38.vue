<template>
  <div class="map" id="map"></div>
</template>

<script>
import * as maptalks from "maptalks";
import * as turf from "turf";
import axios from "axios";
export default {
  data() {
    return {
      markerList: [],
      markerVectorLayer:null,
    };
  },
  created() {
    this.getAllCities().then(data => {
      console.log(data);
      this.markerList = data.data.result3.objects;
      this.drawMarker();
    });
  },
  mounted() {
    this.initMap();
  },
  methods: {
    /**
     * @description: 初始化地图
     * @param {type}
     * @return:
     */
    initMap() {
      var vm = this;
      vm.map = new maptalks.Map("map", {
        center: [-112.2693, 33.5123],
        zoom: 12,
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate:
            "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          subdomains: ["a", "b", "c", "d"],
          attribution:
            '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
        })
      });
      this.initLayer()
    },
    /**
     * @description: 初始化图层
     * @param {type}
     * @return:
     */
    initLayer() {
      if (this.markerVectorLayer == undefined) {
        this.markerVectorLayer = new maptalks.VectorLayer("makerVector");
        this.markerVectorLayer.addTo(this.map);
      }
      this.drawTurfTo()
    },
    /**
     * @description: 请求数据
     * @param {type}
     * @return:
     */
    getAllCities() {
      let vm = this;
      let url = "http://localhost:8082/tile38/getFleet";
      return axios({
        method: "get",
        url: url
      }).then(res => {
        console.log(res);
        return res;
      });
    },
    /**
     * @description: 绘制mark点
     * @param {type}
     * @return:
     */
    drawMarker() {
      for (let item of this.markerList) {
        //console.log(item);
        var point = new maptalks.Marker(item.object.coordinates, {
          visible: true,
          editable: true,
          cursor: "pointer",
          shadowBlur: 0,
          shadowColor: "black",
          draggable: false,
          dragShadow: false, // display a shadow during dragging
          drawOnAxis: null // force dragging stick on a axis, can be: x, y
        });
        this.markerVectorLayer.addGeometry(point);
      }
    },
    drawTurfTo() {
      var point = turf.point([-112.2693, 33.5123]);
      var buffered = turf.buffer(point, 1000, "meters");
      console.log(buffered);
      new maptalks.Polygon(buffered.geometry.coordinates, {
            symbol: {
              polygonFill: "#f984e1",
              polygonOpacity: 0.6,
              lineColor: "#11ffbc"
            }
          }).addTo(this.markerVectorLayer);
    }
  }
};
</script>


<style lang="scss" >
.map {
  height: 590px;
  margin-bottom: 10px;
  border: solid 1px rgba(113, 113, 113, 0.6);
}
</style>