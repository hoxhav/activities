const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    "lintOnSave": false,
    "runtimeCompiler": true,
    "publicPath": "/",
    "configureWebpack": {
        "devtool": "eval-source-map",
    },
    "devServer": {
        "disableHostCheck": true
    },
    "transpileDependencies": [
        "vuetify"
    ],

    chainWebpack: (config) => {
        config.plugins.delete('prefetch'),
        config.plugins.delete('preload')
    },

    configureWebpack: {

        optimization: {
            minimize: true
        },

        plugins: [new BundleAnalyzerPlugin()]

    },



    pwa: {
        name: 'Activities',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        display: 'standalone',
        workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
        workboxOptions: {}, // only for GenerateSW

    }
}