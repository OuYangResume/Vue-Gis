<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-01-07 09:48:49
 * @LastEditTime: 2019-12-18 22:17:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div id="mapid" :style="{height:height,width:width}"></div>
    <div id="menu">
      <input id="basic" type="radio" name="rtoggle" value="basic" />
      <label for="basic">basic</label>
      <input id="streets" type="radio" name="rtoggle" value="streets" checked="checked" />
      <label for="streets">streets</label>
      <input id="bright" type="radio" name="rtoggle" value="bright" />
      <label for="bright">bright</label>
      <input id="light" type="radio" name="rtoggle" value="light" />
      <label for="light">light</label>
      <input id="dark" type="radio" name="rtoggle" value="dark" />
      <label for="dark">dark</label>
      <input id="satellite" type="radio" name="rtoggle" value="satellite" />
      <label for="satellite">satellite</label>
    </div>
    <div>
      <el-row>
        <el-button plain @click="addpop">使用element-ui</el-button>
        <el-button type="primary" plain v-on:click="measureLine()">测量距离</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { showPopover, closePopover } from "./components/Popup";

let count = 1;
export default {
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "800px"
    }
  },
  data() {
    return {
      layerStyle: ["basic", "streets", "bright", "light", "dark", "satellite"]
    };
  },
  methods: {
    initMap() {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoib3V5YW5nYm8iLCJhIjoiY2pjMWg4aTlsMDI5aDJ3bno4cmNxMzF6NSJ9.WMvxZlMQXZp8nY6slMe1nA";

      const map = new mapboxgl.Map({
        container: "mapid",
        style: "mapbox://styles/mapbox/streets-v9",
        center: [113, 30],
        zoom: 12
      });

      let layerList = document.getElementById("menu");
      let inputs = layerList.getElementsByTagName("input");
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = function(layer) {
          var layerId = layer.target.id;
          map.setStyle("mapbox://styles/mapbox/" + layerId + "-v9");
        };
      }
      this.mapClickEvent(map);
    },
    mapClickEvent(map) {
      let vm = this;
      map.on("click", e => {
        console.log(e);
        count = count + 2;
        let lnglat = [e.lngLat.lng, e.lngLat.lat];
        showPopover("oouyang", map, {
          coordinates: lnglat,
          width: 450,
          // height: 400,
          autoCenter: false,
          closeLast: true,
          count: count,
          addpop: this.addpop,
          jianpop:this.jianpop
        });
      });
    },

    measureLine() {
      closePopover();
    },
    addpop(name,count) {
      console.log('1111',name,count)
    },
    jianpop(count){
      console.log('22222',count)
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style>
@import url("https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css");
#menu {
  background: #fff;
  padding: 10px;
  font-family: "Open Sans", sans-serif;
}
</style>

