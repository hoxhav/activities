module.exports = {
  "lintOnSave": false,
  "runtimeCompiler": true,
  "publicPath": "/",
  "configureWebpack": {
    "devtool": "eval-source-map"
  },
  "devServer": {
    "disableHostCheck": true
  },
  "transpileDependencies": [
    "vuetify"
  ]
}