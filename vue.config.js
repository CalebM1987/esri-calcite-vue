const stencil = require('@stencil/webpack');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  publicPath: "./",
  // chainWebpack: config => {
  //   config.module
  //     .rule('vue')
  //     .use('vue-loader')
  //     .tap(options => {
  //       options.compilerOptions = {
  //         ...options.compilerOptions,
  //         isCustomElement: tag => tag.startsWith('calcite-')
  //       }
  //       return options
  //     })
  // },
  // configureWebpack: () => {
  //   return {
  //     // rules: [
  //     //   {
  //     //     test: /\.vue$/,
  //     //     use: 'vue-loader',
  //     //     options: {
  //     //       compilerOptions: {
  //     //         isCustomElement: tag => tag.startsWith('calcite')
  //     //       }
  //     //     }
  //     //   }
  //     // ],
  //     plugins: [
  //       new stencil.StencilPlugin(),
  //       new CopyPlugin({
  //         patterns:[
  //           {
  //             from: 'node_modules/@webcomponents/webcomponentsjs/',
  //             //     // from: '**/*.js',
  //                 to: 'webcomponents'
  //           }
  //         ]
  //       })
  //     ]
  //   }
   
  // }
  
}