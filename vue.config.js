const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.when(process.env.NODE_ENV , config => {
         config.entry('app').clear().add('./src/examples/main.js')
    })
}
})
