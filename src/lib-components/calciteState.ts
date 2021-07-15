import { ref, reactive, Ref } from 'vue'

export const theme: Ref<CalciteTheme> = ref('light')

export const calciteState = reactive({
  theme
})