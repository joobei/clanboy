const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      watchFiles:true,
      liveReload:true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/_variables.scss";
        `
      }
    }
  }
})