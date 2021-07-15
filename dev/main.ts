import { createApp } from 'vue';
import App from './App.vue';
// import App from './AppTest.vue'
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "app.use" call
import EsriCalciteVue from '@/entry.esm';
import { loadScript, loadCss } from 'esri-loader'
import { applyPolyfills, defineCustomElements } from '@esri/calcite-components/dist/loader'
// import '@webcomponents/webcomponentsjs/webcomponents-loader'
// import "@esri/calcite-components"
// import { calcite_alert as CalciteAlert } from '@esri/calcite-components/dist/esm/calcite-alert.entry'
// import '@esri/calcite-components/dist/calcite/calcite.js';
// import '@esri/calcite-components/dist/calcite/calcite.css'


// preload some esri stuff
loadScript()
loadCss('https://js.arcgis.com/4.18/esri/themes/dark/main.css');
const app = createApp(App);

// app.config.isCustomElement = tag => tag.startsWith('calcite-')
// applyPolyfills().then(()=> defineCustomElements())


// app.component('calcite-alert', new CalciteAlert())
// app.use(EsriCalciteVue);

app.mount('#app');
