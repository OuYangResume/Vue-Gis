<template>
  <div>
    <div id="map"></div>
    <div v-on:click="open">开始</div>
  </div>
</template>
<script>
import * as maptalks from "maptalks"
import Path_Animation from "./components/mapmove.js";
export default {
  data() {
    return {
      map: null,
      path:null,
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
      let option = {
        name: "oouyang",
        map: vm.map,
        lineData: [
        [111.32450763502036, 31.667512417065313],
        [113.32450763502036, 33.667512417065313],
        [114.32450763502036, 31.667512417065313],
        [114.32450763502036, 36.667512417065313],
        [116.32450763502036, 35.667512417065313]
      ],
      };
       vm.path = new Path_Animation(option);
    },
    open(){
        this.path.open();
    }
  }
};
</script>
<style lang="scss" scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>

