<template>

  <v-app class="grey lighten-4" >

    <div v-if="loaded">
      <Navbar/>
      <v-main class="mx-4 pb-15">
        <router-view />
      </v-main>
      <Footer/>
    </div>
    <div v-else >
      <v-overlay
        opacity="1"
        value="true"
      >
        <v-progress-circular indeterminate size="100" v-if="loadingCircular">
          {{loadingMsg}}
        </v-progress-circular>
        <div v-else class="ma-5">
          {{loadingMsg}}
        </div>
      </v-overlay>
    </div>

  </v-app>


</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Vue from 'vue'

export default {
  name: 'App',
  components: { Navbar, Footer },
  props : ['keycloak'],
  data: () => ({
    loaded: false,
    loadingMsg: 'Loading...',
    loadingCircular: true,
  }),
  beforeMount() {
    this.appLoadData();
  },
  methods : {
    appLoadData(){
      var user = Vue.$keycloak.tokenParsed.preferred_username
      console.log(user);
      this.$store.dispatch('getUser', user).then(() =>{
        this.$store.dispatch('getGroups').then(() => {
            this.loaded = true;
        })
      })
      .catch(() =>{
        this.loadingMsg = "Impossible d'établir la connexion au serveur, veuillez rafraichir la page ou contacter l'administrateur.";
        this.loadingCircular = false;
      })
    }
  }
};
</script>


