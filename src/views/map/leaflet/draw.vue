<template>
  <div>
    <div id="map"></div>
  </div>

</template>

<script>
require("leaflet-draw");
import turf from "turf";
export default {
  name: "draw",
  data() {
    return {
      map: null
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
              weight: 5
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
          circlemarker: false //圆标记
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
        console.log(e);
        // console.log(e.layer.editing.latlngs[0])
        if (type === "marker") {
          layer.bindPopup("A popup!");
        }
        if (type === "polyline") {
          // console.log(e.layer.editing.latlngs);
          // var from = turf.point([-75.343, 39.984]);
          // var to = turf.point([-75.534, 39.123]);
          // var options = { units: "kilometers" };
          // var distance = turf.distance(from, to, options);
          // console.log(distance);
        }
        if (type === "polygon") {
          console.log(e.layer.editing.latlngs["0"]);
          var area = turf.area(e.layer);
          console.log(area);

          var polygon = turf.polygon([
            [
              [12509809.066157985, 3538634.439487219],
              [12565302.348693045, 3535271.21024267],
              [12553072.424167413, 3507601.0060034255],
              [12509809.066157985, 3538634.439487219]
            ]
          ]);

          var area = turf.area(polygon);
          console.log(area);
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

