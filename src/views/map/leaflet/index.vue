<template>
  <div>
    <div id="mapid">
    </div>
    <el-row>
      <el-tooltip class="item" effect="dark" content="Bottom Left 提示文字" placement="top-start">
        <el-button plain>使用element-ui</el-button>
      </el-tooltip>
      <el-button type="success" v-on:click="addwmsLayer()">geoserver发布的服务</el-button>
      <el-button type="primary" plain v-on:click="addMapMarker()">添加Awesome图标</el-button>
      <el-button type="success" round v-on:click="addClusterLayer()">添加聚类图层</el-button>
      <el-button type="warning" v-on:click="heatMapLayer()">添加热力图层</el-button>
    </el-row>
    <!-- <button  v-on:click="deleteLayer()">清除</button> -->
  </div>

</template>

<script>
import axios from "axios";
import mapProvider from "../../../../static/script/leaflet.MapProviders.js";

import markerClusterGroup from "leaflet.markercluster";
import Easybutton from "leaflet-easybutton";
export default {
  name: "mapContainer",
  data() {
    return {
      MapMarker: true,
      markercluster: true,
      heatMap: true,
      WMS: true,
      map: null,
      map_config: {
        zoom: 10,
        center: [37.5, 106],
        minZoom: 3,
        maxZoom: 18
      },
      group: null, //一个marke点图层
      markers: null, //聚类点图层
      dataTest: null, //数据源
      heatLayer: null, //热力图图层
      wmsLayer: null //wms图层
    };
  },
  methods: {
    initMap() {
      this.map = L.map("mapid", {
        center: this.map_config.center,
        zoom: this.map_config.zoom,
        minZoom: this.map_config.minZoom,
        maxZoom: this.map_config.maxZoom,
        attribution: "&copy; 高德地图"
        // scrollWheelZoom: false,
      });
    },
    addMapLayers() {
      //   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      //     attribution:
      //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      //   }).addTo(this.map); 加载osm

      L.tileLayer
        .mapProvider("GaoDe.Satellite.Map", {
          attribution: this.map_config.attribution
        })
        .addTo(this.map);
      L.tileLayer
        .mapProvider("GaoDe.Satellite.Annotion", {
          attribution: this.map_config.attribution
        })
        .addTo(this.map);
    },
    addwmsLayer() {
      if (this.WMS) {
        this.wmsLayer = L.tileLayer.wms(
          "http://39.108.100.163:8080/geoserver/xiningTest/wms",
          {
            layers: "xiningTest:psfqbj1",
            //解决图片把地图遮盖住的问题
            format: "image/png",
            version: "1.1.0",
            uppercase: true,
            transparent: true
          }
        );
        this.map.addLayer(this.wmsLayer);
        this.map.flyTo([36.644561, 101.710322], 12);
        this.WMS = false;
      } else {
        this.map.removeLayer(this.wmsLayer);
        this.map.panTo([37.5, 106]);
        this.WMS = true;
      }
    },
    addMapMarker() {
      //使用AwesomeMarkers图标
      var redMarker = L.AwesomeMarkers.icon({
        prefix: "fa",
        icon: "home",
        markerColor: "red",
        iconColor: "white"
      });
      var point = L.marker([37.5, 106], { icon: redMarker });

      switch (this.MapMarker) {
        case true: {
          this.group = L.layerGroup();
          point
            .addTo(this.group)
            .bindPopup("<b>当前工作地址<br>联系我：13135667053</b>")
            .openPopup();
          this.map.addLayer(this.group);
          this.MapMarker = false;
          break;
        }
        case false: {
          this.group.clearLayers();
          this.MapMarker = true;
          break;
        }
      }
    },
    changEasybutton() {
      var stateChangingButton = L.easyButton({
        states: [
          {
            stateName: "zoom-to-forest", // name the state
            icon: "fa-tree", // and define its properties
            title: "定位到工作地点", // like its title
            onClick: function(btn, map) {
              // and its callback
              map.setView([37.5, 106], 10);
              btn.state("zoom-to-school"); // change state on click!
            }
          },
          {
            stateName: "zoom-to-school",
            icon: "fa-university",
            title: "zoom to a school",
            onClick: function(btn, map) {
              map.setView([30.5, 106], 12);
              btn.state("zoom-to-forest");
            }
          }
        ]
      });
      stateChangingButton.addTo(this.map);
    },
    addClusterLayer() {
      //聚类图层
      var addressPoints = this.dataTest;
      if (this.markercluster) {
        this.markers = L.markerClusterGroup();
        for (var i = 0; i < addressPoints.length; i++) {
          var item = addressPoints[i];
          var title = item.attribute.name;
          var redMarker = L.AwesomeMarkers.icon({
            prefix: "fa",
            icon: "heart",
            markerColor: "blue",
            iconColor: "white"
          });
          var marker = L.marker(new L.LatLng(item.y, item.x), {
            title: title,
            icon: redMarker
          });
          marker.bindPopup(
            "<div><span>县区名称：" +
              title +
              "</span><br><span>所属省份：" +
              item.attribute.proname +
              "</span></div>"
          );
          this.markers.addLayer(marker);
        }
        this.map.addLayer(this.markers);
        this.markercluster = false;
      } else {
        this.markers.clearLayers();
        this.markercluster = true;
      }
    },
    heatMapLayer() {
      // console.log(this.dataTest);
      var testData1 = {
        max: 8,
        data: this.dataTest
      };
      var cfg = {
        //热力距离和透明度 radius should be small ONLY if scaleRadius is true (or small radius is intended)
        radius: 0.2,
        maxOpacity: 0.6,
        // scales the radius based on map zoom
        scaleRadius: true,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        useLocalExtrema: true,
        //纬度 which field name in your data represents the latitude - default "lat"
        latField: "y",
        // 经度 which field name in your data represents the longitude - default "lng"
        lngField: "x"
        // which field name in your data represents the data value - default "value"
        // valueField: 'count'
      };
      if (this.heatMap) {
        this.heatLayer = new HeatmapOverlay(cfg);
        this.heatLayer.setData(testData1);
        this.map.addLayer(this.heatLayer);
        this.heatMap = false;
      } else {
        //热力图的清除功能
        this.map.removeLayer(this.heatLayer);
        this.heatMap = true;
      }
    },
    deleteLayer() {}
  },
  mounted() {
    this.initMap(); //初始化地图
    this.addMapLayers(); //添加高德底图
    // this.addMapMarker();
    this.changEasybutton();
  },
  created() {
    //获取数据
    axios.get("../../../static/data/county.json").then(response => {
      //  console.log(response.data);
      return (this.dataTest = response.data[0].items);
    });
  }
};
</script>

<style scoped>
@import url("https://cdn.bootcss.com/leaflet.markercluster/1.1.0/MarkerCluster.Default.css");
#mapid {
  width: 100%;
  height: 80vh;
}
/* .classa{
  color: red;
} */
</style>
