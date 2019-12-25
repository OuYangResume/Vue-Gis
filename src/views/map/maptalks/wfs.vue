<template>
  <div class="map" id="map"></div>
</template>

<script>
import Vue from "vue";
import * as maptalks from "maptalks";
import mapinfowin from "./components/mapinfowin";

export default {
  data() {
    return {
      map: null,
      wfsLayer: null,
      layer: null,
      mapData: {
        districtName: "ouyangbo"
      }
    };
  },
  components: {
    mapinfowin
  },
  mounted() {
    this.initMap();
    // this.addwfsLayer();
    console.log(mapinfowin.render);
  },
  methods: {
    initMap() {
      var vm = this;
      vm.$nextTick(function() {
        $(".close").on("click", function() {
          alert(1);
        });
      });
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

      vm.wfsService(
        "http://120.77.215.143:6080/arcgis/rest/services/xiangyang/xiangyang/MapServer/0",
        {
          //where: "type = '八一泵站'"  属性查询
        }
      );
    },
    //esri插件添加wfs服务
    addwfsLayer() {
      var vm = this;
      var maptalks = require("maptalks.esri");
      vm.wfsLayer = new maptalks.esri.FeatureLayer(
        "wfsLayer",
        "http://120.77.215.143:6080/arcgis/rest/services/xiangyang/xiangyang/MapServer/0",
        {
          symbol: {
            lineColor: "#000000",
            lineWidth: 2,
            lineDasharray: null, //线形
            lineOpacity: 1,
            polygonFill: "#6394d5",
            polygonOpacity: 0.5
          }
        }
      ).addTo(vm.map);
      vm.wfsLayer.on("loadend", function(e) {
        var geometries = e.geometries;
        console.log(e);
      });
    },
    //自定义wfs服务。
    wfsService(url, option) {
      var vm = this;
      vm.layer = new maptalks.VectorLayer("vector").addTo(vm.map);
      var _url = url;
      var filter = vm._QueryParams(option);
      var requestUrl = _url + filter;
      $.ajax({
        url: requestUrl,
        async: true,
        dataType: "jsonp",
        success: function(e) {
          var data = maptalks.Util.parseJSON(e);
          var filterUrl = _url + "?f=pjson";
          $.ajax({
            url: filterUrl,
            async: false,
            dataType: "jsonp",
            success: function(res) {
              var lInfo = maptalks.Util.parseJSON(res);
              // console.log(data);
              // console.log(lInfo);
              var geometries = vm._createGeometries(
                data.features,
                lInfo.geometryType
              );
              vm.addInfoWin(geometries);
              vm.layer.addGeometry(geometries);
            },
            error: function(b) {}
          });
        },
        err: function(a) {}
      });
    },
    //根据wfs创建对应的geometrie
    _createGeometries(features, type) {
      let geometries = null;
      if (!type) {
        throw new Error("The layer's geometry type is unknown");
        return;
      }
      switch (type) {
        case "esriGeometryPoint":
          geometries = this._createPoint(features);
          break;
        case "esriGeometryPolyline":
          geometries = this._createLineString(features);
          break;
        case "esriGeometryPolygon":
          geometries = this._createPolygon(features);
          break;
        default:
          break;
      }
      return geometries;
    },
    //创建点
    _createPoint(features) {
      const geometries = [];
      const symbol = undefined;
      features.forEach(
        function(feature) {
          geometries.push(
            new maptalks.Marker(feature.geometry, {
              symbol: symbol,
              properties: feature.attributes
            })
          );
        }.bind(this)
      );
      return geometries;
    },
    //创建线
    _createLineString(features) {
      const geometries = [];
      const symbol = { lineColor: "red" };
      features.forEach(
        function(feature) {
          geometries.push(
            new maptalks.MultiLineString(feature.geometry.paths, {
              symbol: symbol,
              properties: feature.attributes
            })
          );
        }.bind(this)
      );
      return geometries;
    },
    //创建面
    _createPolygon(features) {
      var vm = this;
      //自定义样式
      var _symbol1 = {
        lineColor: "#000000",
        lineWidth: 2,
        lineDasharray: null, //线形
        lineOpacity: 1,
        polygonFill: "#6394d5",
        polygonOpacity: 0.5
      };
      var polygons = [];
      for (var i = 0, len = features.length; i < len; i++) {
        var feature = features[i];
        var polygon = new maptalks.Polygon(feature.geometry.rings, {
          symbol: _symbol1
        });
        polygon.attributes = feature.attributes;
        //鼠标在要素上移动时改变polygon透明度
        var selected = true;
        if (selected == true) {
          var oldopacity = 0;
          polygon.on("mouseover", function(g) {
            var _target = g.target;
            var currentopacity = _target.getSymbol().polygonOpacity;
            oldopacity =
              oldopacity < currentopacity && oldopacity != 0
                ? oldopacity
                : currentopacity;
            var newopacity =
              currentopacity + 0.2 <= 1 ? currentopacity + 0.2 : 1;
            var _symbol = _target.getSymbol();
            _target.updateSymbol({ polygonOpacity: newopacity });
            _target.on("mouseout", function(_g) {
              var _target_ = _g.target;
              _target_.updateSymbol({
                polygonOpacity: oldopacity
              });
            });
          });
        }
        polygons.push(polygon);
      }
      return polygons;
    },

    getDemo() {
      return (
        <div class="mapinfowin">
          <div class="head">
            aaa<div class="close">X</div>
          </div>
          <div class="main">
            <div class="left">
              <div class="title">人口总数</div>
              <div class="number">38410</div>
              <div class="title">诉求数</div>
              <div class="number">379</div>
            </div>
            <div class="left">
              <div class="title">万人投诉率</div>
              <div class="number">11.23%</div>
              <div class="title">主要投诉</div>
              <div class="number">噪音污染</div>
            </div>
          </div>
        </div>
      );
    },
    //polygons添加点击事件
    addInfoWin(geos) {
      var vm = this;
      for (let i = 0; i < geos.length; i++) {
        //vm.setInfoWindow(geos[i]);
        geos[i].on("click", function(g) {
          //还原样式
          geos.forEach(function(e) {
            e.updateSymbol({
              polygonFill: "#6394d5"
            });
          });
          //修改点击样式
          g.target.updateSymbol({
            polygonFill: "#f00"
          });
          vm.setInfoWindow(g.target);
          vm.mapData.districtName = g.target.attributes.type;
          vm.$emit("setmapData", vm.mapData);
        });
      }
    },
    //添加信息框
    setInfoWindow(geo) {
      var attri = geo.attributes;

      // var content =
      //     '<table class="infoWin" cellspacing="5" id="infoWin">';
      // for (var p in attri) {
      //     content +=
      //         "<tr><td>" + p + "</td><td>：" + attri[p] + "</td></tr>";
      // }
      // content += "</table>";
      // var content ='<div>'+attri.type+'<div>';

      var content1 =
        '<div class="mapinfowin">' +
        '<div class="head">' +
        attri.type +
        '<div class="close">X</div>' +
        "</div>" +
        '<div class="main">' +
        '<div class="left">' +
        '<div class="title">人口总数</div>' +
        '<div class="number">38410</div>' +
        '<div class="title">诉求数</div>' +
        '<div class="number">379</div>' +
        "</div>" +
        '<div class="left">' +
        '<div class="title">万人投诉率</div>' +
        '<div class="number">11.23%</div>' +
        '<div class="title">主要投诉</div>' +
        '<div class="number">噪音污染</div>' +
        "</div>" +
        "</div>" +
        "</div>";
      var content = `<div class="mapinfowin">
            <div class="head">${attri.type}<div class="close">X</div></div>
            <div class="main">
                <div class="left">
                    <div class="title">人口总数</div>
                    <div class="number">38410</div>
                    <div class="title">诉求数</div>
                    <div class="number">379</div>
                </div>
                <div class="left">
                    <div class="title">万人投诉率</div>
                    <div class="number">11.23%</div>
                    <div class="title">主要投诉</div>
                    <div class="number">噪音污染</div>
                </div>
            </div>
        </div>
        `;

      let aa = this.getDemo();
      console.log(aa);
      const ToastConstructor = Vue.extend(mapinfowin);

      let instance = new ToastConstructor({
        propsData: options
      }).$mount(document.createElement("div"));
      console.log(instance);
      var options = {
        content: content,
        width: 250 //弹窗的宽度
        // dx: 250, //向左右偏移
        // dy: 50 //上下偏移
      };

      var infoWindow = new maptalks.ui.InfoWindow(options);
      var _infoWin = infoWindow.addTo(geo);
      _infoWin.show();
      //关闭弹窗
      $(".close").bind("click", function() {
        _infoWin.hide();
        //还原样式
        // geo.updateSymbol({
        //     polygonFill: "#6394d5"
        // });
      });
      geo.on("click", function(e) {
        !_infoWin.isVisible()
          ? _infoWin.show(e.target.getCenter())
          : _infoWin.hide();
      });
    },
    onefunc() {
      alert(1);
    },

    //拼接查询参数的方法
    _QueryParams(option) {
      var queryString = "/query?";
      var geometry = option.geometry || "";
      var condition = {
        where: option.where || "1=1",
        geometry:
          geometry instanceof Object ? JSON.stringify(geometry) : geometry,
        geometryType: option.geometryType || "esriGeometryPoint",
        inSR: option.inSR || "",
        spatialRel:
          option.esriSpatialRelIntersects || "esriSpatialRelIntersects",
        relationParam: option.relationParam || "",
        objectIds: option.objectIds || "",
        time: option.time || "",
        returnCountOnly: option.returnCountOnly || false,
        returnGeometry: option.returnGeometry || true,
        maxAllowableOffset: option.maxAllowableOffset || "",
        outSR: option.outSR || "",
        text: option.text || "",
        outFields: option.outFields || "*"
      };
      for (var p in condition) {
        queryString += "&" + p + "=" + condition[p];
      }
      queryString += "&f=pjson";
      return queryString;
    }
  }
};
</script>

<style lang="scss" >
.map {
  height: 590px;
  margin-bottom: 10px;
  border: solid 1px rgba(113, 113, 113, 0.6);
}
.maptalks-msgContent {
  .mapinfowin {
    width: 250px;
    .head {
      background-color: #da4e63;
      opacity: 0.9;
      height: 30px;
      font-size: 18px;
      color: #ffffff;
      padding-left: 8px;
      line-height: 30px;
      .close {
        float: right;
        padding-right: 10px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .main {
      background-color: #fcad3c;
      display: flex;
      .left {
        width: 50%;
        padding: 10px 20px;
        .title {
          height: 25px;
          text-align: center;
          font-size: 14px;
          color: #ffffff;
        }
        .number {
          background-color: #a47128;
          border-radius: 6px;
          height: 30px;
          border: solid 1px #ffffff;
          font-size: 18px;
          color: #fffffe;
          text-align: center;
          line-height: 30px;
        }
      }
    }
  }
}
</style>



