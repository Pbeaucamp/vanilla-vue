<template>
  <v-app class="grey lighten-4" >

    <v-dialog v-model="dialogGroup" persistent max-width="600px" v-if="loaded && selectedGroup == null">
      <v-card>
      <v-card-title>
        <h2 class="subheading grey--text">Choisir un groupe</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
        <v-row>
      
        <v-select
          v-model="group"
          :items="this.userGroups"
          item-text="name"
          label="Groupes"
          outlined
          class="mx-2"
          return-object
          
        ></v-select>                  

        </v-row>
        
        </v-container>
      </v-card-text>
      <v-card-actions>
          <v-spacer></v-spacer>          
          <v-btn  outlined color="success" class="mr-4" @click="selectGroup">Confirmer</v-btn>
      </v-card-actions>
      </v-card>

    </v-dialog>

    <div v-else-if="loaded && selectedGroup != null">
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
    dialogGroup : true,
    group : null,
    loaded: false,
    loadingMsg: 'Loading...',
    loadingCircular: true,
  }),
  computed : {
    ...mapState(['snackbars','groups','selectedGroup','userGroups'])
  },

  beforeMount() {
    this.appLoadData(); 
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
        this.loaded = true;
      })
      .catch( () => {
        this.loadingMsg = "Impossible d'établir la connexion au serveur, veuillez rafraichir la page ou contacter l'administrateur.";
        this.loadingCircular = false;
      });      
    },
    selectGroup() {
      if (this.group != "") {
        this.$store.commit("SELECT_GROUP",this.group);
        this.dialogGroup = false;
      }
      this.loadReports();
    },
    loadReports() {
        this.loaded = false;
        this.$store.dispatch('GetReports').then( () => {
          this.loaded = true;
        })
        .catch( () => {
          this.loadingMsg = "Impossible d'établir la connexion au serveur, veuillez rafraichir la page ou contacter l'administrateur.";
          this.loadingCircular = false;
        });
    },

    manageKeycloakUser() {
      
      
       
      //console.log("Token parsed " + JSON.stringify(Vue.$keycloak.tokenParsed));
      var userLogin = Vue.$keycloak.tokenParsed.preferred_username;
      var keycloakGroups = Vue.$keycloak.tokenParsed.groups;
        
      return new Promise( (resolve) => {
        this.$store.dispatch('getGroups').then( (response) => {
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
            

            Promise.all(promiseArray).then( () => { 

              this.$store.dispatch("getUserGroups", {userLogin : userLogin}).then( () => {
                resolve();
              });
            });
          
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
              })
              Promise.all(promiseArray).then( () => { 
                this.$store.dispatch("getUserGroups", {userLogin : userLogin}).then( () => {
                  resolve();
                });
              });       
            }
          })
        })
      })
      
    },


  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        document.title ='Vanilla Report Viewer';
      }
    },
  }
  
};
</script>


