<template>
  <div>
    <div id="map" class="container"></div>
    <button @click="updateLayer(1)">添加点</button>
    <button @click="updateLayer(2)">聚类</button>
    <button @click="updateLayer(3)">热力图层</button>
    <button @click="clearlayer()">清除</button>
    <button @click="distance()">测距</button>
    <button @click="area()">测面</button>
  </div>
</template>

<script>
import * as maptalks from "maptalks";
import * as turf from "turf";
import { ClusterLayer } from "maptalks.markercluster";
import { HeatLayer } from "maptalks.heatmap";
export default {
  data() {
    return {
      name: "map",
      map: null,
      markerVectorLayer: null, //点图层
      clusterLayer: null, //聚类图层
      heatLayer: null, //热力图层
      distanceTool: null, //测量距离
      areaTool: null, //测量面积
      addressPoints: [
        //点数据
        [-37.6433062833, 175.2721598, "3"],
        [-37.8129763667, 175.2714296333, "10"],
        [-37.71369515, 175.2414571167, "11"],
        [-37.81322845, 175.2815556, "12"],
        [-37.8137875333, 175.2712745333, "13"],
        [-37.8433246833, 175.57138025, "14"],
        [-37.8140672667, 175.2712932667, "15"],
        [-37.8131234, 175.2811189833, "16"],
        [-37.7507629167, 175.2502213833, "34"],
        [-37.7305923333, 175.2499560667, "35"],
        [-37.5508608333, 175.3500617167, "36"],
        [-37.6506927833, 175.2898010667, "37"],
        [-37.7509818, 175.2499128333, "38"]
      ]
    };
  },
  methods: {
    initMap: function() {
      this.map = new maptalks.Map("map", {
        center: [175, -37.898568],
        zoom: 8,
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          subdomains: ["a", "b", "c"],
          attribution:
            '&copy; <a href="http://www.osm.org" target="_blank">OpenStreetMap</a> contributors'
        })
      });
    },
    updateLayer: function(type) {
      var that = this;
      this.removeAllLayer();
      switch (type) {
        case 1:
          that.addMarker();
          break;
        case 2:
          that.addclusterLayer();
          break;
        case 3:
          that.addHeatLayer();
      }
    },
    removeAllLayer() {
      var that = this;
      if (that.clusterLayer != null) {
        that.map.removeLayer(that.clusterLayer);
        //that.clusterLayer = null;
      }
      if (that.markerVectorLayer != null) {
        that.map.removeLayer(that.markerVectorLayer);
        that.markerVectorLayer = null;
      }
      if (that.heatLayer != null) {
        that.map.removeLayer(that.heatLayer);
        that.heatLayer = null;
      }
      if (that.distanceTool != null) {
        that.distanceTool.clear(); //清除线
      }
    },
    addMarker: function() {
      if (this.markerVectorLayer == null) {
        this.markerVectorLayer = new maptalks.VectorLayer("makerVector");
        this.markerVectorLayer.addTo(this.map);
      }
      var point = new maptalks.Marker([175, -37.898568], {
        visible: true,
        editable: true,
        cursor: "pointer",
        shadowBlur: 0,
        shadowColor: "black",
        draggable: false,
        dragShadow: false, // display a shadow during dragging
        drawOnAxis: null // force dragging stick on a axis, can be: x, y
      });
      this.markerVectorLayer.addGeometry(point);
    },
    addclusterLayer: function() {
      var vm = this;
      var clustervectorLayer = new maptalks.VectorLayer("vc").addTo(vm.map);

      var markers = [];
      for (var i = 0; i < this.addressPoints.length; i++) {
        var a = this.addressPoints[i];
        var _marker = new maptalks.Marker([a[1], a[0]]);
        var options = {
          title: "信息框",
          content: a[2]
        };
        _marker.attributes = "ooouang";
        var infoWindow = new maptalks.ui.InfoWindow(options);
        //var _infoWin = infoWindow.addTo(_marker);
        // _marker.on("click", function(e) {
        //   !_infoWin.isVisible()
        //     ? _infoWin.show(e.target.getCenter())
        //     : _infoWin.hide();
        // });
        markers.push(_marker);
      }
      if (this.clusterLayer == null) {
        this.clusterLayer = new ClusterLayer("cluster", markers, {
          noClusterWithOneMarker: false,
          maxClusterZoom: 18,
          //"count" is an internal variable: marker count in the cluster.
          symbol: {
            markerType: "ellipse",
            markerFill: {
              property: "count",
              type: "interval",
              stops: [
                [0, "rgb(135, 196, 240)"],
                [9, "#1bbc9b"],
                [99, "#f54e24"]
              ]
            },
            markerFillOpacity: 0.7,
            markerLineOpacity: 1,
            markerLineWidth: 3,
            markerLineColor: "#fff",
            markerWidth: {
              property: "count",
              type: "interval",
              stops: [[0, 40], [9, 60], [99, 80]]
            },
            markerHeight: {
              property: "count",
              type: "interval",
              stops: [[0, 40], [9, 60], [99, 80]]
            }
          },
          drawClusterText: true,
          geometryEvents: true,
          single: true
        });
      }
      this.map.addLayer(this.clusterLayer);
      vm.map.on("zoomend", function() {
        clustervectorLayer.clear();
      });
      vm.map.on("click", function(e) {
        clustervectorLayer.clear();
        var result = vm.clusterLayer.identify(e.coordinate);
        //console.log(result);
        var features = [];
        //没点击到聚类图标和判断小于三个点的情况
        if (result.children != undefined && result.children.length > 2) {
          result.children.forEach(element => {
            var coord = element.getCoordinates();
            if (result.children.length < 20) {
              //createline(e.coordinate, coord);
            }
            // console.log(coord);
            features.push({
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [coord.x, coord.y]
              }
            });
          });
          var points = { type: "FeatureCollection", features: features };
          //点集合转面
          var hull = turf.convex(points);
          console.log(hull);
          var convex = new maptalks.Polygon(hull.geometry.coordinates, {
            symbol: {
              polygonFill: "#f984e1",
              polygonOpacity: 0.6,
              lineColor: "#11ffbc"
            }
          }).addTo(clustervectorLayer);
        }
      });
    },
    addHeatLayer: function() {
      var vm = this;
      var data = this.addressPoints.map(function(p) {
        return [p[1], p[0]];
      });
      if (vm.heatLayer == null) {
        vm.heatLayer = new HeatLayer("heat", data, {
          forceRenderOnRotating: true,
          forceRenderOnMoving: true,
          minOpacity: 0.5,
          radius: 20, //数字半径
          blur: 15, //模糊半径
          gradient: { 0.4: "blue", 0.65: "lime", 1: "red" }
        });
        vm.map.addLayer(vm.heatLayer);
      }
    },
    clearlayer: function() {
      this.removeAllLayer();
    },
    distance: function() {
      this.distanceTool = new maptalks.DistanceTool({
        symbol: {
          lineColor: "#34495e",
          lineWidth: 2
        },
        vertexSymbol: {
          markerType: "ellipse",
          markerFill: "#1bbc9b",
          markerLineColor: "#000",
          markerLineWidth: 3,
          markerWidth: 10,
          markerHeight: 10
        },

        labelOptions: {
          textSymbol: {
            textFaceName: "monospace",
            textFill: "#fff",
            textLineSpacing: 1,
            textHorizontalAlignment: "right",
            textDx: 15,
            markerLineColor: "#b4b3b3",
            markerFill: "#000"
          },
          boxStyle: {
            padding: [6, 2],
            symbol: {
              markerType: "square",
              markerFill: "#000",
              markerFillOpacity: 0.9,
              markerLineColor: "#b4b3b3"
            }
          }
        },
        clearButtonSymbol: [
          {
            markerType: "square",
            markerFill: "#000",
            markerLineColor: "#b4b3b3",
            markerLineWidth: 2,
            markerWidth: 15,
            markerHeight: 15,
            markerDx: 20
          },
          {
            markerType: "x",
            markerWidth: 10,
            markerHeight: 10,
            markerLineColor: "#fff",
            markerDx: 20
          }
        ],
        language: "zh-CN"
      }).addTo(this.map);
      //this.distanceTool.disable();
    },
    area: function() {
      this.areaTool = new maptalks.AreaTool({
        symbol: {
          lineColor: "#1bbc9b",
          lineWidth: 2,
          polygonFill: "#fff",
          polygonOpacity: 0.3
        },
        vertexSymbol: {
          markerType: "ellipse",
          markerFill: "#34495e",
          markerLineColor: "#1bbc9b",
          markerLineWidth: 3,
          markerWidth: 10,
          markerHeight: 10
        },
        labelOptions: {
          textSymbol: {
            textFaceName: "monospace",
            textFill: "#fff",
            textLineSpacing: 1,
            textHorizontalAlignment: "right",
            textDx: 15
          },
          boxStyle: {
            padding: [6, 2],
            symbol: {
              markerType: "square",
              markerFill: "#000",
              markerFillOpacity: 0.9,
              markerLineColor: "#b4b3b3"
            }
          }
        },
        clearButtonSymbol: [
          {
            markerType: "square",
            markerFill: "#000",
            markerLineColor: "#b4b3b3",
            markerLineWidth: 2,
            markerWidth: 15,
            markerHeight: 15,
            markerDx: 22
          },
          {
            markerType: "x",
            markerWidth: 10,
            markerHeight: 10,
            markerLineColor: "#fff",
            markerDx: 22
          }
        ],
        language: "zh-CN"
      }).addTo(this.map);
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style>
.container {
  height: 80vh;
  width: 100%;
  border: 1px solid;
}
</style>