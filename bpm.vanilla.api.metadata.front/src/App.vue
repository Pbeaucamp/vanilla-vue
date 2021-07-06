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

    <div v-if="!loaded && !(groups.selected == '')" >
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
    dialogGroup : true,
  }),
  computed : {
    ...mapState(['snackbars','groups'])
  },

  beforeMount() {
    //this.appLoadData();
    this.$store.dispatch('getGroups');
    //console.log("weird condition  !loaded && !(groups.selected == '') : " + (!this.loaded && !(this.groups.selected == '') ));
    //console.log("weird condition  !(groups.selected == '') : " + (this.groups.selected == '') );
  }, 
  methods : {
    removeSnackbar(snackbar) {
      this.$store.dispatch('removeSnackbar',snackbar);
    }, 
    selectGroup() {
      if (this.group != "") {
        this.$store.commit("SELECT_GROUP",this.group);
        this.dialogGroup = false;
        this.loadMetadatas();
      }
    },
    loadMetadatas() {
      this.$store.commit("SELECT_REPOSITORY","Vanilla");
      //this.$store.commit("SELECT_GROUP","system");

      this.$store.dispatch('getMetadata').then(() => {
        this.loaded = true;
      }).catch( error => {
        console.log("error getting metadatas : " + error);
      })
    },
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


