import { computed, getCurrentInstance, 
  // reactive, 
  toRefs, ComputedRef, Ref, ref, watchEffect } from 'vue'
import { calciteState } from './calciteState'

/**
 * sets the theme for calcite on the document.body
 * 
 * @param theme - the calcite theme
 */
export function setTheme(theme: CalciteTheme){
  calciteState.theme = theme
  document ? document.body.setAttribute('theme', theme): null
}

/**
 * 
 * @param s - the prefix string
 * @param prop - the property to append
 * @param delimiter - the delimiter that goes between the prefix and prop
 * @returns string - the concatenated string
 */
// export const concatProp = (s: string, prop: string | number, delimiter='-'): string => [s, prop].filter(p => !!p).join(delimiter)
// const getModifier = (mod: Record<string,string> | string={}, key='') => typeof mod === 'string' ? mod: mod[key]
export const concatProp = (s: string, prop: any): ComputedRef<string> => computed(()=> `${s}${s ? '-':''}${prop}`)


export function combineClasses({ props, prefix='', baseClasses=[]}: ICombineOptions): Ref<string[]>{
  const { color, appearance, disabled } = toRefs(props)

  const modifiers: ComputedRef<string[]> = computed(
    () => appearance ?
        Array.isArray(appearance.value) 
        ? appearance.value.map((m: string) => `${prefix}-${m}`)
        : [appearance.value ? `${prefix}-${appearance.value}`: '']
      : []
  )

  const calciteClasses: Ref<string[]> = ref([])

  watchEffect(()=> {
    calciteClasses.value = [
      ...baseClasses,
      prefix,
      prefix && color ? `${prefix}-${props.color}`: '',
      disabled && disabled.value ? `${prefix}-disabled`: '',
      ...modifiers.value
    ]
  })
  
  return calciteClasses
}

/**
 * update prop state in parent components
 * @see https://dev.to/thomasfindlay/how-to-easily-sync-with-multiple-v-models-in-vue-3-using-composition-api-1pmg
 * @param props 
 * @param propName 
 * @returns 
 */
export const useVModel = (props: Record<string,any>, propName: string) => {
  const vm = getCurrentInstance()!.proxy

  return computed({
    get() {
      return props[propName]
    },
    set(value) {
      vm!.$emit(`update:${propName}`, value)
    },
  })
}
