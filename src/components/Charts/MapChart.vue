<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "echarts";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "MapChart"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    }
  },
  data() {
    return {
      myChart: null
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    initChart() {
      let myChart = echarts.init(document.getElementById(this.id));
      debugger;
      var uploadedDataURL = "../../../static/100000.json";
      var geoCoordMap = {
        台湾: [121.5135, 25.0308],
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        安徽: [117.29, 32.0581],

        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891]
      };

      var colors = [
        [
          "#1DE9B6",
          "#F46E36",
          "#04B9FF",
          "#5DBD32",
          "#FFC809",
          "#FB95D5",
          "#BDA29A",
          "#6E7074",
          "#546570",
          "#C4CCD3"
        ],
        [
          "#37A2DA",
          "#67E0E3",
          "#32C5E9",
          "#9FE6B8",
          "#FFDB5C",
          "#FF9F7F",
          "#FB7293",
          "#E062AE",
          "#E690D1",
          "#E7BCF3",
          "#9D96F5",
          "#8378EA",
          "#8378EA"
        ],
        [
          "#DD6B66",
          "#759AA0",
          "#E69D87",
          "#8DC1A9",
          "#EA7E53",
          "#EEDD78",
          "#73A373",
          "#73B9BC",
          "#7289AB",
          "#91CA8C",
          "#F49F42"
        ]
      ];
      var colorIndex = 0;

      var year = ["2014"];
      var mapData = [[]];

      for (var key in geoCoordMap) {
        mapData[0].push({
          year: "2014",
          name: key,
          value: randomNum(100, 300)
        });
      }
      $.getJSON(uploadedDataURL, function(geoJson) {
          debugger
        echarts.registerMap("china", geoJson);
        var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;
        };
        //飞行线数据处理
        var convertToLineData = function(data, gps) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem.name];
            debugger;
            var toCoord = gps; //郑州
            //  var toCoord = geoGps[Math.random()*3];
            if (fromCoord && toCoord) {
              res.push([
                {
                  coord: fromCoord,
                  value: dataItem.value
                },
                {
                  coord: toCoord
                }
              ]);
            }
          }
          return res;
        };

        let optionXyMap01 = {
          timeline: {},
          baseOption: {
            geo: {
              show: true,
              map: "china",
              roam: true,
              zoom: 1,
              center: [113.83531246, 34.0267395887],
              label: {
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: {
                    type: "radial",
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(147, 235, 248, 0)" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(147, 235, 248, .2)" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  },
                  shadowColor: "rgba(128, 217, 248, 1)",
                  // shadowColor: 'rgba(255, 255, 255, 1)',
                  shadowOffsetX: -2,
                  shadowOffsetY: 2,
                  shadowBlur: 10
                },
                emphasis: {
                  areaColor: "#389BB7",
                  borderWidth: 0
                }
              }
            }
          },
          options: [
            {
              backgroundColor: "#051b4a",
              series: [
                //地图？
                {
                  type: "map",
                  map: "china",
                  geoIndex: 0,
                  aspectScale: 0.75, //长宽比
                  showLegendSymbol: false, // 存在legend时显示

                  roam: true,
                  itemStyle: {
                    normal: {
                      areaColor: "#031525",
                      borderColor: "#FFFFFF"
                    },
                    emphasis: {
                      areaColor: "#2B91B7"
                    }
                  },
                  animation: false,
                  data: mapData
                },
                //地图点的动画效果
                {
                  //  name: 'Top 5',
                  type: "effectScatter",
                  coordinateSystem: "geo",
                  data: convertData(
                    mapData[0]
                      .sort(function(a, b) {
                        return b.value - a.value;
                      })
                      .slice(0, 20)
                  ),
                  symbolSize: function(val) {
                    return val[2] / 10;
                  },
                  showEffectOn: "render",
                  rippleEffect: {
                    brushType: "stroke"
                  },
                  hoverAnimation: true,
                  label: {
                    normal: {
                      formatter: "{b}",
                      position: "right",
                      show: true
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: colors[colorIndex][0],
                      shadowBlur: 10,
                      shadowColor: colors[colorIndex][0]
                    }
                  },
                  zlevel: 1
                },
                //地图线的动画效果
                {
                  type: "lines",
                  zlevel: 2,
                  effect: {
                    show: true,
                    period: 4, //箭头指向速度，值越小速度越快
                    trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                    symbol: "arrow", //箭头图标
                    symbolSize: 3 //图标大小
                  },
                  lineStyle: {
                    normal: {
                      color: colors[colorIndex][0],
                      width: 0.1, //尾迹线条宽度
                      opacity: 0.5, //尾迹线条透明度
                      curveness: 0.3 //尾迹线条曲直度
                    }
                  },
                  data: convertToLineData(mapData[0], [113.12244, 23.009505])
                }
              ]
            }
          ]
        };

        myChart.setOption(optionXyMap01);
      });
      function randomNum(minNum, maxNum) {
        switch (arguments.length) {
          case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
          case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
          default:
            return 0;
            break;
        }
      }
    }
  }
};
</script>
