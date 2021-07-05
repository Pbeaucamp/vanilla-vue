<template>
  <v-app class="grey lighten-4" >
    <div v-if="loaded">
      <Navbar/>
      <v-main class="mx-4 mb-4 pb-15">
        <router-view />
      </v-main>


    <v-dialog
          v-model="dialogGroup"
          persistent
          max-width="600px"
      >
          <v-card>
          <v-card-title>
              <h2 class="subheading grey--text">Choisir un groupe</h2>
          </v-card-title>
          <v-card-text>
              <v-container>
              <v-row>
            
              <v-select
                v-model="group"
                :items="this.groups.data"
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
          {{loadingMsg}}
        </div>
      </v-overlay>
    </div>


  </v-app>


</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex';


export default {
  name: 'App',
  components: { Navbar, Footer },
  data: () => ({
    loaded: false,
    loadingMsg: 'Loading...',
    loadingCircular: true,
    group : "",
    dialogGroup : false,
  }),
  computed : {
    ...mapState(['snackbars','groups'])
  },

  beforeMount() {
    this.appLoadData();
    setInterval(this.appLoadData,1000*60*5); // Rafraichissement des données toutes les 5 minutes.    
  }, 
  methods : {
    removeSnackbar(snackbar) {
      this.$store.dispatch('removeSnackbar',snackbar);
    }, 
    selectGroup() {

    },
    appLoadData() {


      this.$store.commit("SELECT_REPOSITORY","Vanilla");
      this.$store.commit("SELECT_GROUP","system");

      this.$store.dispatch('getMetadata').then(() => {
        this.loaded = true;
      }).catch( error => {
        console.log("error here : " + error);
      })
      
      /*
      this.$store.dispatch('loadData','users').then(() => {
        this.$store.dispatch('loadData','groups').then( () => {
          this.$store.dispatch('loadData','repositories').then( () => {
            var promiseArray = [];
            this.$store.state.users.data.forEach(user => {
              promiseArray.push(this.$store.dispatch('getUserGroups',user.login));
              promiseArray.push(this.$store.dispatch('getUserRepositories',user.login));
            });

            Promise.all(promiseArray).then( () => {
              this.$store.dispatch('groupsChartUser', this.$store.state.groups.data);
              this.loaded = true;
            })

          });    
        } );
      })
      .catch( () => {
        this.loadingMsg = "Impossible d'établir la connexion au serveur, veuillez rafraichir la page ou contacter l'administrateur.";
        this.loadingCircular = false;
      });
      */
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = (to.name+" | Vanilla Metadata") || 'Vanilla Metadata';
      }
    },
  }
  
};
</script>


