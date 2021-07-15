import { ref, isRef } from 'vue'
import { combineClasses } from '../utils'
import { calciteState } from '../calciteState'

export function getCalciteStyle({ props, prefix='', baseClasses=[]}: ICombineOptions): ICalciteStyle {
  const calciteClasses = combineClasses({ props, prefix, baseClasses })
  const _theme = (props?.theme || '').length ? props.theme: calciteState.theme
  const theme = isRef(_theme) ? _theme: ref(_theme)

  return {
    theme,
    calciteClasses
  }
}
