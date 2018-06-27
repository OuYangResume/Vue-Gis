
<template>
    <div id="map">   
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: "地图",
      map: null,
      groupLayer: null,
      lng: null,
      lat: null
    };
  },
  methods: {
    initMap() {
      this.map = L.map("map").setView([30, 112], 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18
      }).addTo(this.map);
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
      this.map.on("click", function(e) {
        groupLayer.clearLayers();
        var point = L.marker(e.latlng, { icon: redMarker });
        point.addTo(groupLayer);
        this.lng = e.latlng.lng;
        this.lat = e.latlng.lat;
        console.log(this.lng + "aaaaaaa" + this.lat);
      });
    },
    setLngLat(e) {
      this.$emit("getLngLat", this.lng, this.lat); //注册事件
      e.preventDefault();
    }
  },
  mounted() {
    this.initMap();
    this.clickMap();
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

