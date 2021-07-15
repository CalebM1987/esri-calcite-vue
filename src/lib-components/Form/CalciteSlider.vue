<script lang="ts">
import { defineComponent, watch, ref } from 'vue';
// import { useVModel } from '../utils'

export default /*#__PURE__*/defineComponent({
  name: 'CalciteSlider', 
  emits: ['update:value', 'value-changed'],
  props: {
    label: {
      type: String,
      default: 'Slider'
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 50
    }
  },

  setup(props, context){
    // const {
    //   label,
    //   min,
    //   max,
    //   step,
    //   value
    // } = toRefs(props)

    const valueState = ref(props.value)
    // const valueState = useVModel(props, 'value')

    watch(valueState, (val, oldVal) =>{
      console.log('value changed from slider input', val, oldVal)
      context.emit('value-changed', val)
    })
    return {
      valueState
    }
  }
})
</script>

<template>

  <div class="calcite-slider">
    <slot>
      <label>{{ label }}</label>
    </slot>

    <input 
      type="range" 
      :min="min" 
      :max="max" 
      :value="value" 
      :step="step" 
      :aria-valuemin="min" 
      :aria-valuemax="max" 
      :aria-valuenow="value"
      @change="val => valueState = parseInt(val.target.value)"
    >
  </div>

</template>