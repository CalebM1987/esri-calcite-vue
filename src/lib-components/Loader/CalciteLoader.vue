<template>
  <div :class="loaderClasses">
    <div class="loader-bars"></div>
    <div class="loader-text">
      <slot name="loaderText">{{ loaderText }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import './loaderTypes'

export default /*#__PURE__*/defineComponent({
  name: 'CalciteLoader', 
  props: {
    active: {
      required: false,
      type: Boolean,
      default: true
    },

    loaderText: {
      required: false,
      type: String,
      default: 'Loading...'
    }
  },
  
  setup(props){
    const activeClass = ref(()=> props.active ? "is-active": "")
    const loaderClasses = computed(()=> [
      "loader", 
      "padding-leader-1", 
      "padding-trailer-1", 
      activeClass.value() 
    ])
    
    return {
      loaderClasses,
      activeClass
    }
  }
  
});
</script>

<style lang="scss">
.loader {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
  
</style>