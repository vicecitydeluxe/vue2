const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '/coldleads-frontend/',
    chainWebpack: config => {
        config
            .module
            .rule('csv')
            .test(/\.csv$/)
            .use('file-loader')
            .loader('file-loader')
            .options({
                dynamicTyping: true,
                header: true,
                skipEmptyLines: true,
                name: 'example.csv'
            })
            .end()
    }
})

