<template>
    <div id="mapid">
        
    </div>
</template>

<script>

import mapProvider from '../../../static/script/leaflet.MapProviders.js'
export default {
  name: "mapContainer",
  data() {
    return {
      map: null,
      map_config: {
        zoom: 4,
        center: [37.5, 106],
        minZoom: 3,
        maxZoom: 18
      }
    };
  },
  methods: {
    initMap() {
      this.map = L.map("mapid", {
        center: this.map_config.center,
        zoom: this.map_config.zoom,
        minZoom: this.map_config.minZoom,
        maxZoom: this.map_config.maxZoom,
         attribution: "&copy; 高德地图",
        // scrollWheelZoom: false,
      });
    },
    addMapLayers() {
    //   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //     attribution:
    //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //   }).addTo(this.map); 加载osm


    L.tileLayer.mapProvider('GaoDe.Normal.Map',
                    {attribution: this.map_config.attribution}).addTo(this.map);
    }
  },
  mounted() {
    this.initMap();
    this.addMapLayers();
  }
};
</script>

<style scoped>
#mapid {
  width: 100%;
  height: 750px;
}
</style>
