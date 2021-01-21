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

        config.plugins.delete('prefetch')

    },

    configureWebpack: {

        optimization: {
            minimize: true
        }
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