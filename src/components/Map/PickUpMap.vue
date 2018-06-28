

<template>
<div>
<div id="map">      
    </div>
     <button @click="setLngLat" >获取坐标</button>
</div>
       
</template>

<script>
export default {
  props: {
   
  },
  data() {
    return {
      name: "地图",
      map: null,
      groupLayer: null,
      lnglat:{},
    };
  },
  methods: {
    initMap() {
      this.map = L.map("map").setView([30, 112], 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18
      }).addTo(this.map);

      this.clickMap()
    },
    clickMap() {
        var redMarker = L.AwesomeMarkers.icon({
        prefix: "fa",
        icon: "home",
        markerColor: "bule",
        iconColor: "white"
      });
      var groupLayer = L.layerGroup();
      this.map.addLayer(groupLayer);
      this.lnglat=this.map.on("click", function(e) {
        groupLayer.clearLayers();
        var point = L.marker(e.latlng, { icon: redMarker });
        point.addTo(groupLayer);
        this.lng = e.latlng.lng;
        this.lat = e.latlng.lat;
        return {
            lng:e.latlng.lng,
            lat:e.latlng.lat
        }
      });
    
    },
    setLngLat: function(e) {
        console.log(this.lnglat);
       this.$emit("getLngLat", this.lnglat.lng, this.lnglat.lat); //注册事件
      
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.css");
#map {
  width: 100%;
  height: 50vh;
}
</style>

