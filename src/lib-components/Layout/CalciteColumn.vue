<template>
  <div :class="layoutClasses">
    <slot>column-{{ cols }}</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, Ref, ref, watchEffect } from 'vue';

interface ICalciteColumnProps {
  /** the column size (desktop or default) */
 cols: number;
 /** columns size for tablet breakpoint */
 tablet?: number;
 /** column size for phone breakpoint */
 phone?: number;
 /** center the column */
 center?: boolean;
}

/**
 * ESRI Calcite Button
 * @see https://esri.github.io/calcite-web/documentation/components/#buttons
 */
export default /*#__PURE__*/defineComponent({
  name: 'CalciteColumn', 
  props: {
    cols: {
      required: true,
      type: Number,
      default(){
        return []
      }
    },
    phone: {
      required: false,
      type: Number,
      default: 0
    },
    tablet: {
      required: false,
      type: Number,
      default: 0
    },
    center: {
      type: Boolean,
      default: false
    }
  },

  setup(props: ICalciteColumnProps){

    const { cols, phone, tablet, center } = toRefs(props)

    const layoutClasses: Ref<string[]> = ref([])

    watchEffect(()=> {
      layoutClasses.value = [`column-${cols.value}`]
      phone?.value && layoutClasses.value.push(`phone-column-${phone.value}`)
      tablet?.value && layoutClasses.value.push(`tablet-column-${tablet.value}`)
      center?.value && layoutClasses.value.push('center-column')
    })

    return {
      layoutClasses
    }
  }
  
});
</script>