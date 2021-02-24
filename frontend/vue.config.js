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

    configureWebpack: {

        optimization: {
            minimize: true
        }
    },

    chainWebpack: config => {

    	config.plugins.delete('prefetch')
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