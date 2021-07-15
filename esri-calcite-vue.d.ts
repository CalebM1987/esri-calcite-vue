import { DefineComponent, Plugin } from 'vue';


declare const EsriCalciteVue: Exclude<Plugin['install'], undefined>;
export default EsriCalciteVue;

export const EsriCalciteVueSample: DefineComponent<{}, {}, any>;
