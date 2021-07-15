<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
// import { useVModel } from '../utils'

export default /*#__PURE__*/defineComponent({
  name: 'CalciteToggleSwitch', 
  emits: ['update:value', 'value-changed'],
  props: {
    label: {
      type: String,
      default: 'Toggle Me'
    },
    value: {
      type: Number,
      default: false
    }
  },

  setup(props, context){
   
    const valueState = ref(props.value)

    watch(valueState, (val, oldVal) =>{
      console.log('value changed from toggle input', val, oldVal)
      context.emit('value-changed', val)
    })
    return {
      valueState
    }
  }
})
</script>

<template>

  <label class="toggle-switch">
    <input type="checkbox" class="toggle-switch-input" :checked="value" @change="e => valueState = e.target.value">

    <slot>
      <span class="toggle-switch-label font-size--1">{{ label }}</span>
    </slot>

  </label>

</template>