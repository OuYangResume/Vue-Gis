import * as maptalks from 'maptalks';

class realTimeTrance {
    pointFeature =true;
    lineFeature =true;
    constructor(options) {
        this.geomline =null
        this._map = options.map;
        this._LinePoints = [];
        this.init();
    }
    init() {
        this._createLayer();
    }
    _createLayer() {
        // this._vecSource = new ol.source.Vector({
        //     features: this._features,
        //     wrapX: false
        // });
        // this._vecLayer = new ol.layer.Vector({
        //     style: this.drawedStyle,
        //     source: this._vecSource
        // });
        this._vecLayer = new maptalks.VectorLayer("vector");
        if (!this._map) {
            console.log("未定义map容器")
            return;
        }
        this._map.addLayer(this._vecLayer);
    }
    addGeometry(geometry) {
        console.log("sad")
        this._vecLayer.addGeometry(geometry);
    }
    addPoint(point){
        this._LinePoints.push(point);
        if(this._LinePoints.length>=2){
            this._createLine();
        }
        this._createMarker(point);

    }

    _createLine() {
        if(this.lineFeature){
            this.geomline = new maptalks.LineString(this._LinePoints, {
                id: "geomline"
              });
              var symbol = {
                lineColor: "rgba(250,0,0,1)",
                lineWidth: 8,
                lineJoin: "round", //miter, round, bevel
                lineCap: "round", //butt, round, square
                lineDasharray: null, //dasharray, e.g. [10, 5, 5]
                "lineOpacity ": 1
              };
              this.geomline.setSymbol(symbol);
              this.addGeometry(this.geomline);
              this.lineFeature =false;
              return;
        }else{
            this.geomline.setCoordinates(this._LinePoints);
        }
        
      }
    _createMarker(point){
        if (this.pointFeature) {
             this.geompoint =new maptalks.Marker(point,{
                id:"geompoint"
            })
            this._vecLayer.addGeometry(this.geompoint);
            this.pointFeature =false;
            return;
          } else {
            this.geompoint.setCoordinates(point);
          }
    }
    test() {
        console.log("测试类里面的方法")
        let point = [111.32450763502036, 31.667512417065313]
        this.geompoint = new maptalks.Marker(point, {
            id: "geompoint"
        })
        this._vecLayer.addGeometry(this.geompoint);
    }
}


class Path_Animation {
    options = {
        map: null,
        time: 100
    };
    /**
     * Path_Animation的构造函数
     * @param {*} options 
     */
    constructor(options) {
        this.setOptions(this, options);
        this._map = this.options.map;
        this.time = this.options.time;
        this.linePoints = null;
        this.isOpen = false;
        this.speed = 2;
        this.init();
    }
    setOptions(obj, options) {
        for (var i in options) {
            obj.options[i] = options[i];
        }
        return obj.options;
    }
    init() {
        var option = {
            map: this._map
        };
        this.real = new realTimeTrance(option);
    }
    close() {
        this.isOpen=false;
        if (this.setInterval) {
          window.clearInterval(this.setInterval);
        }
        this.clear();
        this.index = 0;
        this.linePoints = [];
      }
    open() {
        //this.real.test();
        //this.close();
        this.isOpen = true;
        this.linePoints = this.getNewData(this.options.lineData);
        this.addLine(this.options.lineData);
        this.createInterval();
    }
    createInterval(){
        var self=this;
        self.setInterval=setInterval(function(){
            if(self.isOpen){
                setTimeout(function(){
                    if(self.index<self.linePoints.length){
                        self.real.addPoint(self.linePoints[self.index]);
                        // if(self.index>1){
                        //     var Angle=self.getAngle(self.linePoints[self.index-1],self.linePoints[self.index]);
                        //     self.IconRotation(Angle);
                        // }
                        self.index++;
                    }else{
                      //  self.realTimeTrance.clear();
                        window.clearInterval(self.setInterval);
                        self.index=0;
                        self.isOpen=false;
                    }
                },parseInt(self.time/self.speed))
            }
        },parseInt(self.time/self.speed));
    }

    addLine(lineData) {
        var lineSymbol = {
            lineColor: "#1bbc9b",
            lineWidth: 6,
            lineJoin: "round", //miter, round, bevel
            lineCap: "round", //butt, round, square
            lineDasharray: null, //dasharray, e.g. [10, 5, 5]
            "lineOpacity ": 1
        };
        var line = new maptalks.LineString(lineData);
        line.setSymbol(lineSymbol);
        this.real.addGeometry(line);
    }
    getNewData(linePoints) {
        var points = [];
        var line = linePoints;
        //修改为for  of
        for (var i = 0; i < line.length; i++) {
            if (i + 1 < line.length) {
                var lonlats = this.insertPoint(line[i], line[i + 1], this.time);
                points = points.concat(lonlats);
            }
        }
        return points;
    }

    insertPoint(startPoint, endPoint, speed) {
       // var distance = this.getDistance(startPoint, endPoint, true);
        //var insertPointLength = Math.ceil(distance / (speed));
        var insertPointLength = speed;
        //计算每一段的长度。
        var Dx = (endPoint[0] - startPoint[0]) / insertPointLength;
        var Dy = (endPoint[1] - startPoint[1]) / insertPointLength;
        var points = [startPoint];
        for (var i = 0; i < insertPointLength; i++) {
            if (i != (insertPointLength - 1)) {
                var this_point = points[points.length - 1];
                points[points.length] = [this_point[0] + Dx, this_point[1] + Dy];
            }
        }
        return points;
    }
};

export default Path_Animation;
