<template>
  <div id="esri-map" ref="esriMap"></div>
  <div id="filter-container" ref="sliderContainer">
    <calcite-slider 
      v-show="sliderReady"
      class="padding-leading-1"
      ref="slider"
      :min="minWind"
      :max="maxWind"
      :value="windFilter"
      :label="sliderLabel"
      @value-changed="onValueChanged"
    ></calcite-slider>
  </div>
</template>

<script lang="ts">
/// <reference types="@types/arcgis-js-api" />
import { defineComponent, nextTick, ref, watchEffect, computed } from "vue";
import { loadModules } from 'esri-loader'
import { CalciteSlider } from '@/entry.esm'

export default defineComponent({
  name: 'map-view',

  components: {
    CalciteSlider
  },
  
  async setup() {
    /**
     * do we really want vue to make these reactive? Are they really going to change?
     * this will add extra overhead. If we need to handle reactive changes on esri stuff,
     * we can take advantage by using "esri/core/watchUtils" or by using the Accessor.watch()
     */
    
    try {
      const [
        Map,
        MapView,
        FeatureLayer,
      ] = await loadModules<[
        __esri.MapConstructor,
        __esri.MapViewConstructor,
        __esri.FeatureLayerConstructor,
      ]>([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
      ])
    
      // work with esri modules here
      // instead declare them as static data properties
      const map = new Map({
        basemap: "streets-night-vector",
      });

      const view = new MapView({
        container: "esri-map", // just pass this here to set required property
        map,
        zoom: 5,
        center: [-95, 39],
        popup: {
          autoOpenEnabled: false,
        },
      });

      const symbol = {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          path: "M14.5,29 23.5,0 14.5,9 5.5,0z",
          color: "#ffff00",
          outline: {
            color: [0, 0, 0, 0.7],
            width: 0.5
          },
          angle: 180,
          size: 15
        } as __esri.SimpleMarkerSymbolProperties

      const rotationRenderer = {
          type: "simple", // autocasts as new SimpleRenderer()
          symbol,
          visualVariables: [
            {
              type: "rotation",
              field: "WIND_DIRECT",
              rotationType: "geographic"
            },
            {
              type: "size",
              field: "WIND_SPEED",
              minDataValue: 0,
              maxDataValue: 60,
              minSize: 8,
              maxSize: 40
            }
          ]
        } as __esri.RendererProperties

      const layer = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/weather_stations_010417/FeatureServer/0",
        outFields: ["*"],
        title: "Wind Speed",
        renderer: rotationRenderer
      });

      map.add(layer)

      const minWind = ref(0)
      const maxWind = ref(100)
      const windFilter = ref(0)
      const sliderReady = ref(false)

      const sliderLabel = computed(()=> `Wind Speed >= ${windFilter.value}mph`)

      const onValueChanged = (val: number) => {
        console.log('slider changed for map: ', val)
        windFilter.value = val
      }

      return {
        view,
        map,
        layer,
        minWind,
        maxWind,
        windFilter,
        sliderReady,
        sliderLabel,
        onValueChanged
      }

    
    } catch (error) { 
      // handle any script or module loading errors
      console.error(error)
    }
    
  },

  created(){
    // verify we have access to view, layer
    console.log('view: ', this.view)
    console.log('map: ', this.map)
    
    /**
     * the map actually won't render from our setup() because the
     * "esri-map" div does not exist yet, so we must re-set it here 
     */
    nextTick(()=> {
      // I was having issues with race conditions here, had to set a small timeout
      setTimeout(()=> {
        this.view.container = this.$refs.esriMap
        console.log('view container: ', this.view.container)
      }, 150)
    })

    // here is where we can actually test things out
    this.view.whenLayerView(this.layer).then((layerView: __esri.FeatureLayerView) => {
      console.log("layerview generated")
      console.log(layerView)

      const query = this.layer.createQuery()
      query.where = '1=1'
      query.outFields = ['*']
      query.outStatistics = ['min', 'max'].map(t => {
        return { 
          onStatisticField: 'WIND_SPEED',
          outStatisticFieldName: `wind_speed_${t}`,
          statisticType: t,
        } as __esri.StatisticDefinition
      })

      this.layer.queryFeatures(query).then((resp: __esri.FeatureSet) => {
        console.log('query resp: ', resp)
        const feature = resp.features[0]
        console.log('query yo: ', this.minWind, this.maxWind, feature.attributes)
        this.minWind = feature.attributes.wind_speed_min
        this.maxWind = feature.attributes.wind_speed_max

        // prepare slider 
        this.view.ui.add(this.$refs.sliderContainer, 'bottom-right')
        this.sliderReady = true
        
        // watch for changes on the wind filter
        watchEffect(() => {
          console.log('watch effect: ', this.windFilter)
          layerView.filter = {
            where: `WIND_SPEED >= ${this.windFilter}`
          }
        })

      })
    });
  }
});
</script>

<style scoped>
#esri-map{
  height: 100%;
  width: 100%;
}

#filter-container {
  opacity: 0.85;
  padding: 1rem;
  background-color: whitesmoke;
  width: 250px;
  max-width: calc(50vw);
}
</style>