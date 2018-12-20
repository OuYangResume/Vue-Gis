<template>
  <div>
    <div id="map"></div>
    <div @click="play">开始</div>
    <button @click="pause">暂停</button>
    <button @click="cancel">重新开始</button>
    <button @click="speed">加速</button>
    <button @click="speed1">减速</button>
  </div>
</template>

<script>
import * as maptalks from "maptalks";
import { RoutePlayer } from "maptalks.routeplayer";
export default {
  data() {
    return {
      map: null,
      player:null,
      mapconfig: {
        zoom: 12,
        center: [121.475031060928, 31.2611187865471]
      }
    };
  },
  mounted() {
    this.$nextTick(function() {
      // DOM 更新了
      this.initmap();
      this.createRouter()
    });
  },
  methods: {
    initmap() {
      var vm = this;
      vm.map = new maptalks.Map("map", {
        center: vm.mapconfig.center,
        zoom: vm.mapconfig.zoom,
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate:
            "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          subdomains: ["a", "b", "c", "d"],
          attribution:
            '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
        })
      });
    },
    createRouter() {
      var route = [
        {
          path: [
            //[x, y, time]
            [121.475031060928, 31.2611187865471, 301000],
            [121.47940842604, 31.263466566376, 541000],
            [121.47940842604, 31.273466566376, 851000]
          ],
          //marker's symbol
          markerSymbol: null,
          //route line's symbol
          lineSymbol: { lineColor: "#f00" }
        }
      ];
       this.player = new RoutePlayer(route, this.map);
       var unitTime = this.player.getUnitTime();
       console.log(unitTime)
    },
    play() {
      this.player.play();
    },
    pause(){
        this.player.pause();
    },
    cancel(){
        this.player.cancel();
    },
    speed(){

    },
    speed1(){}
  }
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>
