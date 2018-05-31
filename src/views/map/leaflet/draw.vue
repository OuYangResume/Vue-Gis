<template>
    <div id="map"></div>
</template>

<script>
require("leaflet-draw");
export default {
  name: "draw",
  data() {
    return {
      map: null,
      editableLayers: null
    };
  },
  methods: {
    initMap() {
      this.map = L.map("map").setView([30, 112], 8);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18
      }).addTo(this.map);
    },
    editLayer() {
       let editableLayers = new L.FeatureGroup();
      this.map.addLayer(editableLayers);

      //使用AwesomeMarkers图标
      var redMarker = L.AwesomeMarkers.icon({
        prefix: "fa",
        icon: "home",
        markerColor: "red",
        iconColor: "white"
      });

      let drawPluginOptions = {
        position: "topright",
        draw: {
          polyline: {
            shapeOptions: {
              color: "#f357a1",
              weight: 10
            }
          },
          polygon: {
            allowIntersection: false, //是否允许相交
            drawError: {
              color: "#e1e100",
              message: "<strong>错误！<strong> 绘制的图像叠加了"
            },
            shapeOptions: {
              color: "#bada55"
            }
          },
          circle: false,
          rectangle: {
            shapeOptions: {
              clickable: false
            }
          },
          marker: {
            icon: redMarker
          },
           circlemarker:false,//圆标记
        },
        edit: {
          featureGroup: editableLayers
        }
      };

      var drawControl = new L.Control.Draw(drawPluginOptions);
      this.map.addControl(drawControl);

     this.map.on("draw:created", function(e) {
        var type = e.layerType,
          layer = e.layer;
          console.log(e)
        if (type === "marker") {
          layer.bindPopup("A popup!");
        }

        editableLayers.addLayer(layer);
      });
    }
  },
  mounted() {
    this.initMap();
    this.editLayer();
  }
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.css");
#map {
  width: 100%;
  height: 80vh;
}
</style>

