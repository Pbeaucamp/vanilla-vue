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
    this.manageKeycloakUser().then(() => {
      this.appLoadData();
    });


  },
  methods : {
    appLoadData(){
      var user = Vue.$keycloak.tokenParsed.preferred_username
      //console.log(user);
      this.$store.dispatch('getUser', user).then(() =>{
        this.$store.dispatch('getGroups').then(() => {
          this.$store.dispatch('getRepositories', user).then(() => {
            this.loaded = true;
          })
        })
      })
      .catch(() =>{
        this.loadingMsg = "Impossible d'établir la connexion au serveur, veuillez rafraichir la page ou contacter l'administrateur.";
        this.loadingCircular = false;
      })
    },

manageKeycloakUser() {
      
      
       
      //console.log("Token parsed " + JSON.stringify(Vue.$keycloak.tokenParsed));
      var userLogin = Vue.$keycloak.tokenParsed.preferred_username;
      var keycloakGroups = Vue.$keycloak.tokenParsed.groups;
        
      return new Promise( (resolve) => {
        this.$store.dispatch('getAllGroups').then( (response) => {
          var groups = response;
          
          this.$store.dispatch('getUserGroups',{userLogin : userLogin})     
          .then( response => {
            // L'utilisateur existe dans Vanilla, on vérifie la cohérence des groupes
            
            var userGroups =  response;
            var promiseArray = [];
            //console.log("User exist, user groups  : " + JSON.stringify(userGroups));
            for (const groupName of keycloakGroups) {
              //console.log("GroupName of keycloakGroup : " + groupName);
              var searchedGroup = userGroups.find(el => el.name == groupName);
              if (searchedGroup == undefined) {  // s'il n'est pas dans le groupe 

                // Tout refaire car maintenant tout passe par les IDs 

                //console.log("( groups.find(el => el.name == groupName).name : " + ( groups.find(el => el.name == groupName).name ));
                promiseArray.push(this.$store.dispatch('addUserToGroup',{userLogin: userLogin, group: ( groups.find(el => el.name == groupName) ) }));
              } else {
                userGroups.splice(userGroups.indexOf(searchedGroup),1);
              }
            }

            if (userGroups.length>0) {
              //console.log("User Groups after splice : " + JSON.stringify(userGroups));
              for (const group of userGroups) {
                promiseArray.push(this.$store.dispatch('removeUserFromGroup',{ userLogin: userLogin, group: group }));
              }
            }
            Promise.allSettled(promiseArray).then( () => { resolve();});
          
          })
          .catch( reject => {
            if (reject == "User not found.") { // Si l'utilisateur est dans Keycloak mais n'existe pas dans vanilla 

              var data ={
                name: userLogin,
                login: userLogin,
                password: "Default",
                mail: Vue.$keycloak.tokenParsed.email,
              };  
              var promiseArray = [];
              this.$store.dispatch('addUser',data)
              .then(() => {           
                for (const groupName of keycloakGroups) {
                  //console.log("( groups.find(el => el.name == groupName).name : " + ( groups.find(el => el.name == groupName).name ));
                  promiseArray.push(this.$store.dispatch('addUserToGroup',{ userLogin: userLogin, group: groups.find(el => el.name == groupName) }));
                }
                Promise.allSettled(promiseArray).then( () => {resolve();});       
              })
              
            }
          })


        })
          


      })


      

      
    },



  },

   

};
</script>
