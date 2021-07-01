<template>
  <nav>
    <v-app-bar flat class="indigo">
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light">VANILLA</span>
        <span> USER</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-3" text rounded target="_blank" rel="noopener noreferrer" href="https://semaphore-vanilla.data4citizen.com/vanilla">
      
      <v-img contain max-height="100" max-width="120" src="@/assets/vanilla_white.png"></v-img>
      <v-icon class="ml-1 mt-1" medium color="white">mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="indigo" temporary>
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="@/assets/icon_vanilla.png"> 
          </v-avatar>
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-item v-for="link in links" :key="link.text" :to="link.route">  
          <v-list-item-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-item-action>  
          <v-list-item-content>
            <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>  
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>



<script>
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
        { icon: 'mdi-account-box-multiple', text: 'Utilisateurs', route: '/users' },
        { icon: 'mdi-account-group',  text: 'Groupes', route:'/groups' },  
        { icon: 'mdi-database', text: 'Référentiels', route:'/repositories'},     


      ]
    }
  }
}
</script>

<style>

</style>
