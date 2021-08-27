<template>
  <v-app class="contenu">
    <v-layout>
      <v-col>
        <v-row cols="2" v-if="loaded">          
            <datatable />
            <v-col>
              <group-chart />
              <group-chart2 v-if="this.$store.state.boolniveau.data == true"/>
            </v-col>
        </v-row>
          <v-row v-else>
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
        </v-row>
      </v-col>
    </v-layout>
  </v-app>
</template>

<script>
import Datatable from '../components/Datatable.vue'
import GroupChart2 from '../components/GroupChart2.vue'
import GroupChart from '../components/GroupChart.vue'


  export default {
    name: 'Home',

    components: {
        GroupChart,
        GroupChart2,
        Datatable,
      },
    data: () => ({
      loaded: false,
      loadingMsg: 'Loading...',
      loadingCircular: true,
    }),
    beforeMount() {
      this.getTheme();
    },
    methods : {
      getTheme() {

          var groupName= this.$store.state.groups.data.find(gr => gr.id == this.$route.params.groupID).name;

          
          this.$store.dispatch('getObservatories',groupName);
          this.$store.dispatch('getTheme',groupName).then( () => {



            var kpiName= this.$store.state.themes.data.find(el => el.id == this.$route.params.themeID).name;
          
            if ((this.$route.params.groupID != "") & (this.$route.params.themeID != "")){
              var data = {
                group : groupName,
                theme : kpiName,
                themes : this.$store.state.themes.data
              }
              this.$store.dispatch('tempData', data).then(() => {
                this.$store.dispatch('getKPI', data).then(() => {
                  setTimeout(() => {
                    this.$store.dispatch('resetKPI').then(() =>{
                      this.loaded = true;
                    })
                  }, 10)

                })
              })
              .catch(() =>{
                  this.loadingMsg = "Impossible d'établir la connexion au serveur, veuillez rafraichir la page ou contacter l'administrateur.";
                  this.loadingCircular = false;
              })
            }



          });


        }
      },
  }
</script>
<style>
  .contenu {
    padding-bottom : 0px;
    margin-bottom : 0px
  }
  .layout{
    max-height: 50%;
  }
  .v-application--wrap {
    flex: 1 1 auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    min-height: 87vh;
    max-width: 100%;
    position: relative;
}
</style>