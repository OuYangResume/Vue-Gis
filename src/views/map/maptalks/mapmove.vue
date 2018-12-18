<template>
  <div>
    <div id="map"></div>
    <div>开始</div>
  </div>
</template>

<script>
import * as maptalks from "maptalks";

export default {
  data() {
    return {
      map: null,
      _vecLayer: null,
      time: 100,
      linePoints: null,
      isOpen: false, //是否开启
      setInterval:null,
      index:0,
      lineData: [
        [111.32450763502036, 31.667512417065313],
        [113.32450763502036, 33.667512417065313],
        [114.32450763502036, 31.667512417065313],
        [114.32450763502036, 36.667512417065313],
        [116.32450763502036, 35.667512417065313]
      ]
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
      vm._createLayer();
      vm.open();
    },
    _createLayer() {
      var vm = this;
      vm._vecLayer = new maptalks.VectorLayer("vector");
      vm.map.addLayer(vm._vecLayer);
    },

    open: function() {
      // this.close();
      this.isOpen = true;
      this.linePoints = this.getNewData(this.lineData);
      this.addLine(this.lineData);
      //this.createInterval();
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
      console.log("创建新点成功");
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
          var this_point = points[points.length - 1];
          points[points.length] = [this_point[0] + Dx, this_point[1] + Dy];
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
      this._vecLayer.addGeometry(line);
    },

    createInterval:function(){
        var self=this;
        self.setInterval=setInterval(function(){
            if(self.isOpen){
                setTimeout(function(){
                    if(self.index<self.linePoints.length){
                        self.realTimeTrance.addPoint(self.linePoints[self.index]);
                        if(self.index>1){
                            var Angle=self.getAngle(self.linePoints[self.index-1],self.linePoints[self.index]);
                            self.IconRotation(Angle);
                        }
                        self.index++;
                    }else{
                        self.realTimeTrance.clear();
                        window.clearInterval(self.setInterval);
                        self.index=0;
                        self.isOpen=false;
                    }
                },parseInt(self.time/self.speed))
            }
        },parseInt(self.time/self.speed));
    },
    close: function() {
      this.suspended();
      if (this.setInterval) {
        window.clearInterval(this.setInterval);
      }
      this.realTimeTrance.clear();
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

