module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'https://semaphore-gravitee-gateway.data4citizen.com/vanilla-api',
    port: 8095
  }
}
