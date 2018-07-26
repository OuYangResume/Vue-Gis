<template>
  <div>
    <div id="map"></div>
    {{name}}
    <form class="form-inline">
      <label>Measurement type &nbsp;</label>
      <select id="type">
        <option value="length">Length (LineString)</option>
        <option value="area">Area (Polygon)</option>
      </select>
    </form>
  </div>
</template>

<script>
import("ol/ol.css");
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import { unByKey } from "ol/Observable.js";
import { LineString, Polygon } from "ol/geom.js";
import { getArea, getLength } from "ol/sphere.js";
import Draw from "ol/interaction/Draw.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { OSM, Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
export default {
  data() {
    return {
      name: "openlayer"
    };
  },
  methods: {
    initMap: function() {
      // this.map = new Map({
      //   target: "map",
      //   layers: [
      //     new TileLayer({
      //       source: new OSM()
      //     })
      //   ],
      //   view: new View({
      //     center: [-11000000, 4600000],
      //     zoom: 15
      //   })
      // });
      // console.log(this.map);

      var raster = new TileLayer({
        source: new OSM()
      });

      var source = new VectorSource();

      var vector = new VectorLayer({
        source: source,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)"
          }),
          stroke: new Stroke({
            color: "#ffcc33",
            width: 2
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: "#ffcc33"
            })
          })
        })
      });

      /**
       * Currently drawn feature.
       * @type {module:ol/Feature~Feature}
       */
      var sketch;

      /**
       * The help tooltip element.
       * @type {Element}
       */
      var helpTooltipElement;

      /**
       * Overlay to show the help messages.
       * @type {module:ol/Overlay}
       */
      var helpTooltip;

      /**
       * The measure tooltip element.
       * @type {Element}
       */
      var measureTooltipElement;

      /**
       * Overlay to show the measurement.
       * @type {module:ol/Overlay}
       */
      var measureTooltip;

      /**
       * Message to show when the user is drawing a polygon.
       * @type {string}
       */
      var continuePolygonMsg = "单击继续绘制面";

      /**
       * Message to show when the user is drawing a line.
       * @type {string}
       */
      var continueLineMsg = "单击继续绘制线";

      /**
       * Handle pointer move.
       * @param {module:ol/MapBrowserEvent~MapBrowserEvent} evt The event.
       */
      var pointerMoveHandler = function(evt) {
        if (evt.dragging) {
          return;
        }
        /** @type {string} */
        var helpMsg = "点击开始绘制";

        if (sketch) {
          var geom = sketch.getGeometry();
          if (geom instanceof Polygon) {
            helpMsg = continuePolygonMsg;
          } else if (geom instanceof LineString) {
            helpMsg = continueLineMsg;
          }
        }

        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(evt.coordinate);

        helpTooltipElement.classList.remove("hidden");
      };

      var map = new Map({
        layers: [raster, vector],
        target: "map",
        view: new View({
          center: [-11000000, 4600000],
          zoom: 15
        })
      });

      map.on("pointermove", pointerMoveHandler);

      map.getViewport().addEventListener("mouseout", function() {
        helpTooltipElement.classList.add("hidden");
      });

      var typeSelect = document.getElementById("type");

      var draw; // global so we can remove it later

      /**
       * Format length output.
       * @param {module:ol/geom/LineString~LineString} line The line.
       * @return {string} The formatted length.
       */
      var formatLength = function(line) {
        var length = getLength(line);
        var output;
        if (length > 100) {
          output = Math.round(length / 1000 * 100) / 100 + " " + "km";
        } else {
          output = Math.round(length * 100) / 100 + " " + "m";
        }
        return output;
      };

      /**
       * Format area output.
       * @param {module:ol/geom/Polygon~Polygon} polygon The polygon.
       * @return {string} Formatted area.
       */
      var formatArea = function(polygon) {
        var area = getArea(polygon);
        var output;
        if (area > 10000) {
          output =
            Math.round(area / 1000000 * 100) / 100 + " " + "km<sup>2</sup>";
        } else {
          output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
        }
        return output;
      };

      function addInteraction() {
        var type = typeSelect.value == "area" ? "Polygon" : "LineString";
        draw = new Draw({
          source: source,
          type: type,
          style: new Style({
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)"
            }),
            stroke: new Stroke({
              color: "rgba(0, 0, 0, 0.5)",
              lineDash: [10, 10],
              width: 2
            }),
            image: new CircleStyle({
              radius: 5,
              stroke: new Stroke({
                color: "rgba(0, 0, 0, 0.7)"
              }),
              fill: new Fill({
                color: "rgba(255, 255, 255, 0.2)"
              })
            })
          })
        });
        map.addInteraction(draw);

        createMeasureTooltip();
        createHelpTooltip();

        var listener;
        draw.on(
          "drawstart",
          function(evt) {
            // set sketch
            sketch = evt.feature;

            /** @type {module:ol/coordinate~Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;

            listener = sketch.getGeometry().on("change", function(evt) {
              var geom = evt.target;
              var output;
              if (geom instanceof Polygon) {
                output = formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
              } else if (geom instanceof LineString) {
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
              }
              measureTooltipElement.innerHTML = output;
              measureTooltip.setPosition(tooltipCoord);
            });
          },
          this
        );

        draw.on(
          "drawend",
          function() {
            measureTooltipElement.className = "tooltip tooltip-static";
            measureTooltip.setOffset([0, -7]);
            // unset sketch
            sketch = null;
            // unset tooltip so that a new one can be created
            measureTooltipElement = null;
            createMeasureTooltip();
            unByKey(listener);
          },
          this
        );
      }

      /**
       * Creates a new help tooltip
       */
      function createHelpTooltip() {
        if (helpTooltipElement) {
          helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        helpTooltipElement = document.createElement("div");
        helpTooltipElement.className = "tooltip hidden";
        helpTooltip = new Overlay({
          element: helpTooltipElement,
          offset: [15, 0],
          positioning: "center-left"
        });
        map.addOverlay(helpTooltip);
      }

      /**
       * Creates a new measure tooltip
       */
      function createMeasureTooltip() {
        if (measureTooltipElement) {
          measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement("div");
        measureTooltipElement.className = "tooltip tooltip-measure";
        measureTooltip = new Overlay({
          element: measureTooltipElement,
          offset: [0, -15],
          positioning: "bottom-center"
        });
        map.addOverlay(measureTooltip);
      }

      /**
       * Let user change the geometry type.
       */
      typeSelect.onchange = function() {
        map.removeInteraction(draw);
        addInteraction();
      };
      addInteraction();
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>
<style>
#map {
  width: 100%;
  height: 80vh;
}
.tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
}
.tooltip-measure {
  opacity: 1;
  font-weight: bold;
}
.tooltip-static {
  background-color: #ffcc33;
  color: black;
  border: 1px solid white;
}
.tooltip-measure:before,
.tooltip-static:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: "";
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}
.tooltip-static:before {
  border-top-color: #ffcc33;
}
</style>

