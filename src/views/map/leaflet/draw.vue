<template>
    <div id="map"></div>
</template>

<script>
export default {
  name: "draw",
  data() {
    return {
      map: null
    };
  },
  methods: {
    initMap() {
      this.map = L.map("map").setView([51.505, -0.09], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style>
#map {
  width: 100%;
  height: 80vh;
}
</style>

