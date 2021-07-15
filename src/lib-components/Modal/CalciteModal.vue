<template>
  <div :class="['js-modal', 'modal-overlay', isVisible ? 'is-active': '']">
    <div class="modal-content column-12" role="dialog" aria-labelledby="modal">

      <a class="right" href="#" aria-label="close-modal" @click="handleCancel">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 32 32" class="svg-icon"><path d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z"/></svg>
      </a>

      <slot name="header">
        <h3 class='trailer-half'>{{ title }}</h3>
      </slot>

      <slot>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </slot>

      <div class="text-right">
        <slot name="footer">
          <calcite-button 
            :color="okBtnOptions.color"
            :appearance="okBtnOptions.appearance" 
            :disabled="okBtnOptions.disabled"
            class="js-modal-toggle"
            @click="handleOk"
          >{{ okBtnOptions.label || 'Ok' }}</calcite-button>

          <calcite-button 
            :color="cancelBtnOptions.color"
            :appearance="cancelBtnOptions.appearance" 
            :disabled="cancelBtnOptions.disabled"
            class="js-modal-toggle" 
            @click="handleCancel"
          >{{ cancelBtnOptions.label || 'Cancel' }}</calcite-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import CalciteButton from '../Button/CalciteButton.vue'
// import './modalTypes';

export default /*#__PURE__*/defineComponent({
  name: 'CalciteModal', 
  components: {
    CalciteButton
  },
  props: {
    title: {
      type: String,
      default: 'Modal'
    },
    okBtnOptions: {
      type: Object as PropType<ICalciteButtonOptions>,
      default: ()=> {
        return {
          label: 'Ok',
          appearance: '',
          color: 'blue',
          disabled: false
        }
      }
    },
    cancelBtnOptions: {
      required: false,
      type: Object as PropType<ICalciteButtonOptions>,
      default: ()=> {
        return {
          label: 'Cancel',
          appearance: '',
          color: 'red',
          disabled: false
        }
      }
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  
  setup(props, context){
    console.log('props: ', props)
    
    
    const defaultVis = props.visible
    const isVisible = ref(defaultVis)
    const visible = ref(props.visible)

    watch(visible, (vis)=> {
      console.log('vis changed: ', vis)
      isVisible.value = vis
    })


    const show = ()=> isVisible.value = true
    const hide = ()=> isVisible.value = false

    function handleOk(){
      hide()
      context.emit('ok')
      context.emit('dismissed')
    }

    function handleCancel(){
      hide()
      context.emit('cancel')
      context.emit('dismissed')
    }

    return {
      // ..._props,
      // ...propState,
      isVisible,
      handleOk,
      handleCancel,
      show,
      hide
    }
  }

})
</script>