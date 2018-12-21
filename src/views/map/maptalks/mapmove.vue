<template>
  <div>
    <div id="map"></div>
    <div v-on:click="open">开始</div>
  </div>
</template>

<script>
import * as maptalks from "maptalks";
export default {
  data() {
    return {
      map: null,
      vecLayer: null,
      time: 100,
      linePoints: null,
      isOpen: false, //是否开启
      setInterval: null,
      index: 0,
      speed: 2,
      LinePoints1: [],
      lineData: [
        [111.32450763502036, 31.667512417065313],
        [113.32450763502036, 33.667512417065313],
        [114.32450763502036, 31.667512417065313],
        [114.32450763502036, 36.667512417065313],
        [116.32450763502036, 35.667512417065313]
      ],
      geomline: null,
      geompoint:null,
      geoline : true,
      geopoint :true
    };
  },
  mounted() {
    this.initmap();
  },
  methods: {
    initmap() {
      var vm = this;
      vm.map = new maptalks.Map("map", {
        center: [111.32450763502036, 31.667512417065313],
        zoom: 8,
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate:
            "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          subdomains: ["a", "b", "c", "d"],
          attribution:
            '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
        })
      });
      vm.createLayer();
    },
    createLayer() {
      var vm = this;
      vm.vecLayer = new maptalks.VectorLayer("vector");
      vm.map.addLayer(vm.vecLayer);
    },

    open: function() {
        this.close();
      this.isOpen = true;
      this.linePoints = this.getNewData(this.lineData);
      this.addLine(this.lineData);
      this.createInterval();
    },
    getNewData: function(linePoints) {
      var points = [];
      var line = linePoints;
      for (var i = 0; i < line.length; i++) {
        if (i + 1 < line.length) {
          var lonlats = this.insertPoint(line[i], line[i + 1], this.time);
          points = points.concat(lonlats);
        }
      }
      console.log("创建新点数据成功");
      return points;
    },
    insertPoint: function(startPoint, endPoint, speed) {
      // var distance = this.getDistance(startPoint, endPoint, true);
      //var insertPointLength = Math.ceil(distance / (speed));
      //将线平分为speed个点
      var insertPointLength = speed;
      //计算每一段的长度。
      var Dx = (endPoint[0] - startPoint[0]) / insertPointLength;
      var Dy = (endPoint[1] - startPoint[1]) / insertPointLength;
      var points = [startPoint];
      for (var i = 0; i < insertPointLength; i++) {
        if (i != insertPointLength - 1) {
          var thispoint = points[points.length - 1];
          points[points.length] = [thispoint[0] + Dx, thispoint[1] + Dy];
        }
      }
      return points;
    },
    addLine: function(lineData) {
      var symbol = {
        lineColor: "#1bbc9b",
        lineWidth: 6,
        lineJoin: "round", //miter, round, bevel
        lineCap: "round", //butt, round, square
        lineDasharray: null, //dasharray, e.g. [10, 5, 5]
        "lineOpacity ": 1
      };
      var line = new maptalks.LineString(lineData);
      line.setSymbol(symbol);
      this.vecLayer.addGeometry(line);
    },

    createInterval: function() {
      var self = this;
      self.setInterval = setInterval(function() {
        if (self.isOpen) {
          setTimeout(function() {
            if (self.index < self.linePoints.length) {
              self.addPoint(self.linePoints[self.index]);
              if (self.index > 1) {
                var Angle = self.getAngle(
                  self.linePoints[self.index - 1],
                  self.linePoints[self.index]
                );
               // self.IconRotation(Angle);
              }
              self.index++;
            } else {
              self.clear();
              window.clearInterval(self.setInterval);
              self.index = 0;
              self.isOpen = false;
            }
          }, parseInt(self.time / self.speed));
        }
      }, parseInt(self.time / self.speed));
    },
    addPoint: function(point) {
      this.LinePoints1.push(point);
      if (this.geoline && this.LinePoints1.length >= 2) {
        this.createLine();
        this.geoline = false;
      } else if (this.LinePoints1.length >= 2) {
          console.log(this.vecLayer.getGeometryById("geomline"))
          console.log(this.geomline)
        this.geomline.setCoordinates(this.LinePoints1);
      }
      this.createMarker(point);
    },
    createLine: function() {
      var self = this;
      this.geomline = new maptalks.LineString(self.LinePoints1, {
        id: "geomline"
      });
      var symbol = {
        lineColor: "rgba(250,0,0,1)",
        lineWidth: 3,
        lineJoin: "round", //miter, round, bevel
        lineCap: "round", //butt, round, square
        lineDasharray: null, //dasharray, e.g. [10, 5, 5]
        "lineOpacity ": 1
      };
      this.geomline.setSymbol(symbol);
      this.vecLayer.addGeometry(this.geomline);

      //   this.LineFeature.setStyle(style);
      //   this.vecSource.addFeature(this.LineFeature);
    },
    createMarker: function(point) {
      if (this.geopoint) {
        // var geom = new ol.geom.Point(point);
        // this.MarkerFeature = new ol.Feature({
        //   geometry: geom
        // });
        // this.MarkerFeature.setStyle(this.options.markerStyle);
        // this.vecSource.addFeature(this.MarkerFeature);
         this.geompoint =new maptalks.Marker(point,{
            id:"geompoint"
        })
        this.vecLayer.addGeometry(this.geompoint);
        this.geopoint =false;
        return;
      } else {
        this.geompoint.setCoordinates(point);
      }
    },
     getAngle:function(startPoint,endPoint){
        var dx=startPoint[0]-endPoint[0];
        var dy=startPoint[1]-endPoint[1];
       return  Math.atan2(dx,dy);
    },
     clear:function(){
        this.vecLayer.clear();
        this.LinePoints1=[];
        this.geoline =true;
        this.geopoint =true;
    },
    close: function() {
      this.isOpen=false;
      if (this.setInterval) {
        window.clearInterval(this.setInterval);
      }
      this.clear();
      this.index = 0;
      this.linePoints = [];
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>

