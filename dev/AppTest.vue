<script>
import '@esri/calcite-components/dist/calcite/calcite.css'
import '@esri/calcite-components/dist/calcite/calcite.js'
import '@esri/calcite-ui-icons/index.js'
export default {
  name: 'app',

  data(){
    return {
      modalActive: false
    }
  },

  methods: {
   
  }
}
</script>

<template>
  <div id="app p-3">
    <!-- <esri-calcite-vue-sample /> -->

    <calcite-button color="red" appearance="clear" @click="modalActive=!modalActive">Test Button <calcite-icon class="my-icon-color-class" icon="arrowBoldLeft"></calcite-icon></calcite-button>

    <!-- <calcite-modal data-modal="foo" ref="modal" title="Alla, Rackball">
      this is the body yo!
    </calcite-modal> -->

    

    <calcite-modal aria-labelledby="modal-title" :active="modalActive" @modalClose="modalActive=false">
      <h3 slot="header" id="modal-title">Title of the modal</h3>
      <div slot="content">The actual content of the modal</div>
      <calcite-button slot="back" color="neutral" appearance="outline" icon="chevron-left">
        Back
      </calcite-button>
      <calcite-button slot="secondary" width="full" appearance="outline" @click="modalActive=false"> Cancel </calcite-button>
      <calcite-button slot="primary" width="full" @click="modalActive=false"> Save </calcite-button>
    </calcite-modal>

    <calcite-alert active>
      <div slot="alert-title">Title of alert</div>
      <div slot="alert-message">Message text of the alert</div>
      <a slot="alert-link" href="#">Retry</a>
    </calcite-alert>
    <calcite-alert active>
      <div slot="alert-title">Title of alert</div>
      <div slot="alert-message">Message text of the alert</div>
      <a slot="alert-link" href="#">Retry</a>
    </calcite-alert>

    
   
    
  </div>
</template>