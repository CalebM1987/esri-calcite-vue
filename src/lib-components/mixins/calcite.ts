import { PropType } from 'vue'
import { calciteState } from '../calciteState'
// import { calciteState } from '../calciteState'

export const themeMixin = {
  props: {
    theme: {
      type: String as PropType<CalciteTheme>,
      default: ''
    }
  }
}

export const colorMixin = {
  props: {
    color: {
      type: String as PropType<CalciteColor>,
      default: 'blue' as CalciteColor
    }
  }
}

export const appearanceMixin = {
  props: {
    appearance: {
      type: [Array, String ] as PropType<ButtonModifier[] | string[] | ButtonModifier | string>,
      default(){
        return calciteState.theme
      }
    }
  }
}

export const disabledMixin = {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}

/**
 * includes the theme, color, and appearance mixin
 */
 export const calciteMixin = {
  mixins: [ themeMixin, colorMixin, appearanceMixin]
}

type MixinType = 
  | "theme"
  | "color"
  | "appearance"
  | "disabled"

export const calciteMixins: Record<MixinType,any> = {
  theme: themeMixin,
  color: colorMixin,
  appearance: appearanceMixin,
  disabled: disabledMixin
}

/**
 * create a mixin from an array of mixins
 * @param mixins - the mixins to import
 * @returns a mixin
 */
export function getCalciteMixin(mixins: MixinType[]): any[]{
  return mixins.map(m => calciteMixins[m])
}
