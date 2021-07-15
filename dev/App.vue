<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { EsriCalciteVueSample } from '@/entry.esm';
// import MapView from './views/MapView.vue';
const MapView = defineAsyncComponent(()=> import('./views/MapView.vue'))

import { 
  CalciteColumn,
  CalciteButton, 
  CalciteLoader,
  CalciteModal,
  CalciteSlider,
  setTheme 
} from '@/entry.esm'

export default defineComponent({
  name: 'App',
  components: {
  //  EsriCalciteVueSample,
    CalciteButton,
    CalciteLoader,
    CalciteModal,
    CalciteColumn,
    CalciteSlider,
    MapView,
  },
  data(){
    return {
      activeLoader: true,
      mapCols: 12,
      showModal: false,
      sliderValue: 50,
      toggleDisabled: false,
      buttonColor: 'red',
      buttonMods: ['clear']
    }
  },

  computed: {
    disabledClass(){
      return this.toggleDisabled ? 'disabled': ''
    }
  },

  mounted(){
    setTheme('dark')
  },

  methods: {
    handleClick(e){
      console.log('clicked button: ', this.showModal)
      // this.showModal = !this.showModal
      // return
      console.log('is vis: ', this.$refs.modal.isVisible)
      this.$refs.modal.show()
      console.log('is vis: ', this.$refs.modal.isVisible)
    },

    handleModalOk(){
      console.log('modal dismissed!')
    },

    handleSliderChange(val){
      console.log('slider prop in parent: ', val, this.sliderValue)
    }
  }
});
</script>

<template>
  <div id="app p-3">
    <!-- <esri-calcite-vue-sample /> -->

    <calcite-modal 
      data-modal="foo" 
      ref="modal" 
      :okBtnOptions="{color: 'green', label: 'Um, ok...'}"
      @ok="handleModalOk" 
      title="Alla, Rackball" 
      :visible="showModal"
    >
      <!-- this is the body yo! -->
    </calcite-modal>

    <calcite-column :cols="24" class="controls padding-leader-1 padding-trailer-1">
      <calcite-button 
        data-modal="foo"
        class="js-modal-toggle"
        :color="buttonColor" 
        :appearance="buttonMods"
        :disabled="toggleDisabled"
        @click="$refs.modal[$refs.modal.isVisible ? 'hide': 'show']()"
      >Test Button</calcite-button>
    </calcite-column>

    <calcite-column :cols="mapCols" :phone="6" :tablet="10" style="height: calc(60vh);">
      <Suspense>
        <template #default>
         
          <map-view />
        </template>

        <template #fallback>
         
          <calcite-loader :active="activeLoader"></calcite-loader>
        </template>

      </Suspense>

    </calcite-column>


    <calcite-column :cols="10">
      <calcite-slider :value="sliderValue" @value-changed="handleSliderChange"></calcite-slider>
    </calcite-column> 
   
    
  </div>
</template>

<style>
/* @import url(https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css); */
  #app {
    padding: 0.5rem;
  }
  
  
</style>
