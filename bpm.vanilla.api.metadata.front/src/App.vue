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

    <div v-if="!loaded && !(groups.selected == null)" >
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


    <v-dialog
    v-model="dialogGroup"
    persistent
    max-width="600px" v-else>
      <v-card>
      <v-card-title>
        <h2 class="subheading grey--text">Choisir un groupe</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
        <v-row>
      
        <v-select
          return-object
          v-model="group"
          :items="this.groups.data"
          item-text="name"
          label="Groupes"
          outlined
          class="mx-2"
          
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
    group : null,
    dialogGroup : true,
  }),
  computed : {
    ...mapState(['snackbars','groups'])
  },

  beforeMount() {
    //console.log("Token parsed :" + JSON.stringify(Vue.$keycloak.tokenParsed));
    this.manageKeycloakUser().then( () => {
      this.$store.dispatch('getUserGroups',{userLogin : Vue.$keycloak.tokenParsed.preferred_username}).then( () => {
        if ( !(this.$route.params.groupID == undefined) ) {
          this.group = this.$store.state.groups.data.find(el => el.id == this.$route.params.groupID); 
          this.selectGroup();
        }
      });
    })
  }, 
  methods : {
    removeSnackbar(snackbar) {
      this.$store.dispatch('removeSnackbar',snackbar);
    }, 
    selectGroup() {
      if (this.group != null) {
        this.$store.commit("SELECT_GROUP",this.group);
        this.dialogGroup = false;
        this.loadMetadatas();
      }
    },
    loadMetadatas() {
      this.$store.commit("SELECT_REPOSITORY","1"); // ID : 1 par défaut car ID du référentiel Vanilla 

      this.$store.dispatch('getMetadata').then(() => {
        this.loaded = true;
      }).catch( error => {
        console.log("error getting metadatas : " + error);
      })
    },

    manageKeycloakUser() {             
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
            Promise.all(promiseArray).then( () => { resolve();});
          
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
              Promise.all(promiseArray).then( () => { resolve();});       
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

        document.title = 'Vanilla Metadata';
      }
    },


  }
  
};
</script>


