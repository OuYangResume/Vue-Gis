<template>
  <div>
    <div id="map">吸附效果</div>
    <div class="drawTool">
      <ul>
        <li>point</li>
        <li>line</li>
        <li>clear</li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as maptalks from "maptalks";
import rbush from "geojson-rbush";
export default {
  data() {
    return {
      map: null,
      allGeometries: [],
      _mousemoveLayer: null,
      snaplayer: [],
      tree: null
    };
  },
  mounted() {
    this.initMap();
    this.init();
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap() {
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
    /**
     * 初始化方法
     */
    init() {
      let vm = this;
      //var layer = new maptalks.VectorLayer("random").addTo(vm.map);
      var layer = vm.randomPoints();
      console.log(layer.getGeometries());
      console.log(layer.bringToFront());
      var drawTool = new maptalks.DrawTool({
        symbol: {
          lineColor: "#f00",
          polygonFill: "#0f0",
          polygonOpacity: 0.6
        },
        mode: "Point"
      })
        .addTo(this.map)
        .disable();
      vm.tree = new rbush();
      vm.addTo();
      vm.setLayer(layer);
    },
    /**
     * 随机生成10个点添加到地图上
     */
    randomPoints() {
      var vm = this;
      var randomPointLayer = new maptalks.VectorLayer("randomPoints", null, {
        geometryEvents: false
      }).addTo(vm.map);
      var extent = vm.map.getExtent();
      const coordinates = [];
      for (var i = 0; i < 10; i++) {
        var coordX = extent.xmin + (extent.xmax - extent.xmin) * Math.random();
        var coordY = extent.ymin + (extent.ymax - extent.ymin) * Math.random();
        var point = new maptalks.Marker([coordX, coordY], {
          symbol: {
            markerType: "ellipse",
            markerWidth: 5,
            markerHeight: 5,
            markerFill: "#FF83FA",
            markerLineColor: "#FFB6C1",
            markerLineWidth: 1,
            markerLineOpacity: 1
          }
        }).addTo(randomPointLayer);
      }
      return randomPointLayer;
    },
    addTo() {
      const id = `${maptalks.INTERNAL_LAYER_PREFIX}_snapto`;
      this._mousemoveLayer = new maptalks.VectorLayer(id).addTo(this.map);
      this.allGeometries = [];
      this.enable();
    },
    /**
     * Start snap interaction
     * 开启吸附
     */
    enable() {
      var vm = this;
      if (this.snaplayer) {
        if (this.snaplayer instanceof Array) {
          this.allLayersGeometries = [];
          this.snaplayer.forEach(
            function(tempLayer, index) {
              const tempGeometries = tempLayer.getGeometries();
              this.allLayersGeometries[index] = this._compositGeometries(
                tempGeometries
              );
            }.bind(this)
          );
          this.allGeometries = [].concat(...this.allLayersGeometries);
        } else {
          const geometries = this.snaplayer.getGeometries();
          this.allGeometries = this._compositGeometries(geometries);
        }
      }
      if (this.allGeometries) {
        if (!this._mousemove) {
          this._registerEvents(vm.map);
        }
        if (this._mousemoveLayer) {
          this._mousemoveLayer.show();
        }
      } else {
        throw new Error(
          "you should set geometries which are snapped to firstly!"
        );
      }
    },
    _registerEvents(map) {
      this._needFindGeometry = true;
      this._mousemove = function(e) {
        this.mousePoint = e.coordinate;
        if (!this._marker) {
          this._marker = new maptalks.Marker(e.coordinate, {
            symbol: {
              markerType: "ellipse",
              markerFill: "#0f89f5",
              markerLineColor: "#fff",
              markerLineWidth: 2,
              markerLineOpacity: 1,
              markerWidth: 15,
              markerHeight: 15
            }
          }).addTo(this._mousemoveLayer);
        } else {
          this._marker.setCoordinates(e.coordinate);
        }
        //indicate find geometry
        if (!this._needFindGeometry) return;
        const availGeometries = this._findGeometry(e.coordinate);
        if (availGeometries.features.length > 0) {
          this.snapPoint = this._getSnapPoint(availGeometries);
          if (this.snapPoint) {
            this._marker.setCoordinates([this.snapPoint.x, this.snapPoint.y]);
          }
        } else {
          this.snapPoint = null;
        }
      };
      this._mousedown = function() {
        this._needFindGeometry = false;
      };
      this._mouseup = function() {
        this._needFindGeometry = true;
      };
      map.on("mousemove touchstart", this._mousemove, this);
      map.on("mousedown", this._mousedown, this);
      map.on("mouseup", this._mouseup, this);
    },

    _findGeometry(coordinate) {
      const availGeimetries = this._prepareGeometries(coordinate);
      return availGeimetries;
    },
    /**
     * @param {Coordinate} mouse's coordinate on map
     * Using a point to inspect the surrounding geometries
     */
    _prepareGeometries(coordinate) {
      if (this.allGeometries) {
        const allGeoInGeojson = this.allGeometries;
        this.tree.clear();
        //构造一个r树。
        this.tree.load({
          type: "FeatureCollection",
          features: allGeoInGeojson
        });
         //构造一个边界框
        this.inspectExtent = this._createInspectExtent(coordinate);
       // 返回给定边界框相交的数据项（点或矩形）数组。
        const availGeometries = this.tree.search(this.inspectExtent);
        return availGeometries;
      }
      return null;
    },
    _createInspectExtent(coordinate) {
      var vm = this;
      const tolerance = 10;
      const zoom = vm.map.getZoom();
      const screenPoint = vm.map.coordinateToPoint(coordinate, zoom);
      const lefttop = vm.map.pointToCoordinate(
        new maptalks.Point([
          screenPoint.x - tolerance,
          screenPoint.y - tolerance
        ]),
        zoom
      );
      const righttop = vm.map.pointToCoordinate(
        new maptalks.Point([
          screenPoint.x + tolerance,
          screenPoint.y - tolerance
        ]),
        zoom
      );
      const leftbottom = vm.map.pointToCoordinate(
        new maptalks.Point([
          screenPoint.x - tolerance,
          screenPoint.y + tolerance
        ]),
        zoom
      );
      const rightbottom = vm.map.pointToCoordinate(
        new maptalks.Point([
          screenPoint.x + tolerance,
          screenPoint.y + tolerance
        ]),
        zoom
      );
      return {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [lefttop.x, lefttop.y],
              [righttop.x, righttop.y],
              [rightbottom.x, rightbottom.y],
              [leftbottom.x, leftbottom.y]
            ]
          ]
        }
      };
    },

/********************debugger */
     _getSnapPoint(availGeometries) {
        const _nearestGeometry = this._findNearestGeometries(availGeometries.features);
        let snapPoint = null;
        if (!this._validDistance(_nearestGeometry.distance)) {
            return null;
        }
        //when it's point, return itself
        if (_nearestGeometry.geoObject.geometry.type === 'Point') {
            snapPoint = {
                x : _nearestGeometry.geoObject.geometry.coordinates[0],
                y : _nearestGeometry.geoObject.geometry.coordinates[1]
            };
        } else if (_nearestGeometry.geoObject.geometry.type === 'LineString') {
            //when it's line,return the vertical insect point
            const nearestLine = this._setEquation(_nearestGeometry.geoObject);
            //whether k exists
            if (nearestLine.A === 0) {
                snapPoint = {
                    x: this.mousePoint.x,
                    y: _nearestGeometry.geoObject.geometry.coordinates[0][1]
                };
            } else if (nearestLine.A === Infinity) {
                snapPoint = {
                    x: _nearestGeometry.geoObject.geometry.coordinates[0][0],
                    y: this.mousePoint.y
                };
            } else {
                const k = nearestLine.B / nearestLine.A;
                const verticalLine = this._setVertiEquation(k, this.mousePoint);
                snapPoint = this._solveEquation(nearestLine, verticalLine);
            }
        }
        return snapPoint;
    },
    /**
     * @param {Layer||maptalk.VectorLayer||Array.<Layer>||Array.<maptalk.VectorLayer>} layer to snap to
     * Set layer for snapping to
     */
    setLayer(layer) {
      if (layer instanceof Array) {
        this.snaplayer = [];
        this.allLayersGeometries = [];
        layer.forEach(
          function(tempLayer, index) {
            if (tempLayer instanceof maptalks.VectorLayer) {
              this.snaplayer.push(tempLayer);
              const tempGeometries = tempLayer.getGeometries();
              this.allLayersGeometries[index] = this._compositGeometries(
                tempGeometries
              );
              tempLayer.on(
                "addgeo",
                function() {
                  const tempGeometries = this.snaplayer[index].getGeometries();
                  this.allLayersGeometries[index] = this._compositGeometries(
                    tempGeometries
                  );
                  this.allGeometries = [].concat(...this.allLayersGeometries);
                },
                this
              );
              tempLayer.on(
                "clear",
                function() {
                  this.allLayersGeometries.splice(index, 1);
                  this.allGeometries = [].concat(...this.allLayersGeometries);
                },
                this
              );
            }
          }.bind(this)
        );
        this.allGeometries = [].concat(...this.allLayersGeometries);
        //将这个图层置于顶部
        // this._mousemoveLayer.bringToFront();
      } else if (layer instanceof maptalks.VectorLayer) {
        const geometries = layer.getGeometries(); //获取layer中的所有要素
        this.snaplayer = layer;
        this.allGeometries = this._compositGeometries(geometries);
        layer.on(
          "addgeo",
          function() {
            const geometries = this.snaplayer.getGeometries();
            this.allGeometries = this._compositGeometries(geometries);
          },
          this
        );
        this.snaplayer.on(
          "clear",
          function() {
            this._clearGeometries();
          },
          this
        );
        // this._mousemoveLayer.bringToFront();
      }
    },
    _compositGeometries(geometries) {
      let geos = [];
      // const mode = this.getMode();
      const mode = "point";
      if (mode === "point") {
        geos = this._compositToPoints(geometries);
      } else if (mode === "line") {
        geos = this._compositToLines(geometries);
      }
      return geos;
    },
    _compositToPoints(geometries) {
      let geos = [];
      geometries.forEach(
        function(geo) {
          geos = geos.concat(this._parserToPoints(geo)); //将数组连接
        }.bind(this)
      );
      return geos;
    },
    _parserToPoints(geo) {
      const type = geo.getType();
      let coordinates = null;
      if (type === "Circle" || type === "Ellipse") {
        coordinates = geo.getShell();
      } else coordinates = geo.getCoordinates();
      let geos = [];
      //two cases,one is single geometry,and another is multi geometries
      if (coordinates[0] instanceof Array) {
        coordinates.forEach(
          function(coords) {
            const _markers = this._createMarkers(coords);
            geos = geos.concat(_markers);
          }.bind(this)
        );
      } else {
        if (!(coordinates instanceof Array)) {
          coordinates = [coordinates];
        }
        const _markers = this._createMarkers(coordinates);
        geos = geos.concat(_markers);
      }
      return geos;
    },
    _createMarkers(coords) {
      const markers = [];
      coords.forEach(function(coord) {
        if (coord instanceof Array) {
          coord.forEach(function(_coord) {
            let _geo = new maptalks.Marker(_coord, {
              properties: {}
            });
            _geo = _geo.toGeoJSON();
            markers.push(_geo);
          });
        } else {
          let _geo = new maptalks.Marker(coord, {
            properties: {}
          });
          _geo = _geo.toGeoJSON();
          markers.push(_geo);
        }
      });
      return markers;
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 600px;
}
.drawTool {
  ul {
    display: flex;
    list-style-type: none;
    li {
      margin: 0 10px;
    }
  }
}
</style>


