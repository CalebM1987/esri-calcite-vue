<template>
  <button  :class="calciteClasses" :theme="theme">
    <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getCalciteStyle } from '../composers/calcite'

import { getCalciteMixin } from '../mixins/calcite'
import './buttonTypes'

/**
 * ESRI Calcite Button
 * @see https://esri.github.io/calcite-web/documentation/components/#buttons
 */
export default /*#__PURE__*/defineComponent({
  name: 'CalciteButton', 
  mixins: getCalciteMixin(['color', 'appearance', 'theme', 'disabled']),
  
  setup(props: ICalciteButtonProps){ 
    const { theme, calciteClasses }= getCalciteStyle({ props, prefix: 'btn' })

    return { theme, calciteClasses }
  },

});
</script>