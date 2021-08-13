<template>
  <v-app class="grey lighten-4" >
    <div v-if="loaded">
      <Navbar/>
      <v-main class="mx-4 mb-4 pb-15">
        <router-view />
      </v-main>
      

      <v-snackbar v-for="(snackbar,index) in snackbars.data" :key="snackbar.id" v-model="snackbar.aff" :style="`bottom: ${(index *4) + 1}em`" right rounded="pill" :color="snackbar.color" timeout="5000">
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn icon text v-bind="attrs" @click="removeSnackbar(snackbar)"> 
              <v-icon  >
                  mdi-close-circle
              </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
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
          <v-container class="text-center">
            <v-row align="center" justify="center" align-content="center" class="text-center">
            {{loadingMsg}}
            </v-row>
            <v-row justify="center">
            <v-btn text @click="logout">
              <v-icon class="pr-1">mdi-logout-variant</v-icon>
              <span>Déconnexion</span>
            </v-btn>
            </v-row>
          </v-container>
        </div>

      </v-overlay>
    </div>


  </v-app>


</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex';
import Vue from 'vue'


export default {
  name: 'App',
  components: { Navbar, Footer },
  data: () => ({
    loaded: false,
    loadingMsg: 'Loading...',
    loadingCircular: true,
  }),
  computed : {
    ...mapState(['snackbars'])
  },

  beforeMount() {
    this.appLoadData();
    setInterval(this.appLoadData,1000*60*5); // Rafraichissement des données toutes les 5 minutes.    
  }, 
  methods : {
    logout() {
      Vue.$keycloak.logout({ redirectUri: window.location.origin });
    },
    removeSnackbar(snackbar) {
      this.$store.dispatch('removeSnackbar',snackbar);
    }, 
    appLoadData() {
      this.manageKeycloakUser().then(() => {


        this.$store.dispatch('loadData','users').then(() => {


          this.$store.dispatch('loadData','groups').then( () => {
            this.$store.dispatch('loadData','repositories').then( () => {

              var userLogin = Vue.$keycloak.tokenParsed.preferred_username;
              var user = this.$store.state.users.data.find(el =>  el.login.toLowerCase() == userLogin)

              //var user = this.$store.state.users.data.find(el =>  el.login == userLogin);
    
              if (user.superUser == false ) {
                this.loadingMsg = "Impossible d'accéder à la plateforme, vous n'avez les autorisations nécessaires.";
                this.loadingCircular = false;          
              } else {

                var promiseArray = [];
                this.$store.state.users.data.forEach(user => {
                  promiseArray.push(this.$store.dispatch('getUserGroups',user.login));
                  promiseArray.push(this.$store.dispatch('getUserRepositories',user.login));
                });

                Promise.allSettled(promiseArray).then( () => {
                  this.$store.dispatch('groupsChartUser', this.$store.state.groups.data);
                  this.loaded = true;
                })
              }
            });    
          });

          
        })
        .catch( () => {
          this.loadingMsg = "Impossible d'établir la connexion au serveur, veuillez rafraichir la page ou contacter l'administrateur.";
          this.loadingCircular = false;
        });

      });

    },
    manageKeycloakUser() {
      
      
      //console.log("Token parsed " + JSON.stringify(Vue.$keycloak.tokenParsed));
      var userLogin = Vue.$keycloak.tokenParsed.preferred_username;
      var keycloakGroups = Vue.$keycloak.tokenParsed.groups;
      return new Promise( (resolve) => {
        this.$store.dispatch('loadData','groups').then( () => {
          var groups = this.$store.state.groups.data;

        
          this.$store.dispatch('getUserGroups',userLogin)
          .then( response => {
            // L'utilisateur existe dans Vanilla, on vérifie la cohérence des groupes

            var userGroups =  response;
            //console.log("User exist, user groups  : " + JSON.stringify(userGroups));
            var promiseArray = [];
            for (const groupName of keycloakGroups) {
              var searchedGroup = userGroups.find(el => el.name == groupName);
              if (searchedGroup == undefined) {  // s'il n'est pas dans le groupe 
                promiseArray.push(this.$store.dispatch('addUserTo',{dataType: "group", userLogin: userLogin, item: groups.find(el => el.name == groupName)   }));
              } else {
                userGroups.splice(userGroups.indexOf(searchedGroup),1);
              }
            }

            if (userGroups.length>0) {
              //console.log("User Groups after splice : " + JSON.stringify(userGroups));
              for (const group of userGroups) {
                promiseArray.push(this.$store.dispatch('removeUserFrom',{dataType: "group", userLogin: userLogin, item: group}));
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
                  promiseArray.push(this.$store.dispatch('addUserTo',{dataType: "group", userLogin: userLogin, item: groups.find(el => el.name == groupName)}));
                }
                Promise.allSettled(promiseArray).then( () => { resolve();});
              })       
            }
          })
        })

      });
      
    },


  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = (to.name+" | Vanilla User") || 'Vanilla User';
      }
    },
  }
  
};
</script>


