module.exports = {
  chainWebpack: config => config.resolve.symlinks(false),
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    devServer: {
       proxy: {
          '/file': {
             target: 'http://localhost:2015',
             pathRewrite: {'^/file' : ''}
          }
       }
    }
  }
}
