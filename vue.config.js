const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/vue2/'
})
/**
 * csv-loader frontend usage
 */
// module.exports = {
//     chainWebpack: config => {
//         config
//             .module
//             .rule('csv')
//             .test(/\.csv$/)
//             .use('csv-loader')
//             .loader('csv-loader')
//             .options({
//                 dynamicTyping: true,
//                 header: true,
//                 skipEmptyLines: true
//             })
//             .end()
//     }
// }
