<template>
<div>
  <div id="mapid">
        
    </div>
    <button class="btn" v-on:click="addMapMarker()" v-model="MapMarker">添加Awesome图标</button>
    <button class="btn" v-on:click="addClusterLayer()" >添加聚类图层</button>
</div>
    
</template>
<script>
import mapProvider from "../../../static/script/leaflet.MapProviders.js";
import markerClusterGroup from "leaflet.markercluster";
import Easybutton from "leaflet-easybutton";
export default {
  name: "mapContainer",
  data() {
    return {
      MapMarker: true,
      map: null,
      map_config: {
        zoom: 10,
        center: [37.5, 106],
        minZoom: 3,
        maxZoom: 18
      },
      group: null,
      point: null,
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
    addMapMarker() {
      //使用AwesomeMarkers图标
      var redMarker = L.AwesomeMarkers.icon({
        prefix: "fa",
        icon: "home",
        markerColor: "blue",
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
    addClusterLayer() {//聚类图层
      this.$http.get("../../../static/data/county.json").then(response => {
        console.log(response);
        var addressPoints = response.body[0].items;
        var markers = L.markerClusterGroup();
        for (var i = 0; i < addressPoints.length; i++) {
          var item = addressPoints[i];
          var title = item.attribute.name;
          var marker = L.marker(new L.LatLng(item.y, item.x), { title: title });
          marker.bindPopup(
            "<div><span>县区名称：" +
              title +
              "</span><br><span>所属省份：" +
              item.attribute.proname +
              "</span></div>"
          );
          markers.addLayer(marker);
        }
        this.map.addLayer(markers);
      });
    }
  },
  mounted() {
    this.initMap();
    this.addMapLayers();
    // this.addMapMarker();
    this.changEasybutton();
  },
  created() {
    
  }
};
</script>

<style scoped>
#mapid {
  width: 100%;
  height: 750px;
}
</style>
