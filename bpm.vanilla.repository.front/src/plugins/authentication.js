import Vue from 'vue'
import Keycloak from 'keycloak-js'

const options = {
  url: 'https://semaphore-keycloak2.data4citizen.com/auth/',
  realm: 'Vanilla7',
  clientId: 'portail'
}

const _keycloak = Keycloak(options)

const Plugin = {
  install(Vue) {
    Vue.$keycloak = _keycloak
  }
}

Plugin.install = Vue => {
  Vue.$keycloak = _keycloak
  Object.defineProperties(Vue.prototype, {
    $keycloak: {
      get() {
        return _keycloak
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin