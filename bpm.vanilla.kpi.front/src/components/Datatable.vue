<template>
    <div class="mt-8">        
        <v-data-table
            :headers="headers"
            :items="this.$store.state.kpi.data"
            :items-per-page="5"
            class="elevation-1">
          <template v-slot:top>                  
            <v-toolbar flat class="indigo">
                <v-toolbar-title class="white--text display-1 text-decoration-underline">Liste des KPIs ({{picker}})</v-toolbar-title>

                <v-spacer></v-spacer>

            <v-dialog max-width="500" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-on="on" v-bind="attrs">
                      Choisir la date
              </v-btn>
              <v-btn @click="reset()" class="mx-2">
                      Aujourd'hui
              </v-btn>
            </template>
            <template>
                  <v-date-picker
                        @click:date="loaddatadate()"
                        v-model="picker"
                        color="indigo"
                        locale="fr-FR">     
                  </v-date-picker>
                  <v-btn dark class='indigo' @click="dialog = false">Valider</v-btn>
            </template>
            </v-dialog> 

            <v-dialog max-width="auto" v-model="dialogb" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="appelcalendar()" v-on="on" v-bind="attrs" class="ml-2">
                  <v-icon> mdi-calendar </v-icon>
              </v-btn>
            </template>
            <template>
              <v-row row="12">
                <v-col cols="6">
                  <template>
                    <v-card>
                      <v-data-table
                        :headers="headers2"
                        :items="items2"
                        class="elevation-1"
                        :items-per-page="12"
                      >
                        <template v-slot:top>
                        <v-toolbar flat class="indigo">
                            <v-toolbar-title class="white--text display-1 text-decoration-underline">Valeurs KPI pour l'année</v-toolbar-title> 
                            <v-spacer></v-spacer>
                            <v-btn class='mx-2' @click="dialogb = false & resetwithoutid()" >Quitter</v-btn>
                        </v-toolbar>
                        </template>
                      </v-data-table>
                    </v-card>
                  </template>
                </v-col>
                <v-col cols="6">
                  <v-card class="ma-5">
                    <group-chart-3/>
                  </v-card>
                </v-col>
              </v-row>
            </template>            
            </v-dialog>  
            </v-toolbar>
        </template>
        <template v-slot:[`item.name`]="{ item }">
            <div v-if="item" @click="test(item.kpiID)" >{{item.name}}</div>
        </template>
        <template v-slot:[`item.result.0.0.date`]="{ item }">
            <div v-if="item">{{parseDate(item.result[0][0].date)}}</div>
        </template>
        <template v-slot:[`item.result.0.0.tendancy`]="{ item }">
            <v-icon v-if="item" >{{icon(item.result[0][0].tendancy)}}</v-icon>
        </template>
        <template v-slot:[`item.result.0.0.health`]="{ item }">
            <v-icon v-if="item">{{health(item.result[0][0].health)}}</v-icon>
        </template>
        <template v-slot:[`item.cacher`]="{ item }">
          <v-simple-checkbox
            v-model="item.Cacher"
            :ripple="false"
            @click="tabcacher()"
          ></v-simple-checkbox>
        </template>
        </v-data-table>

      <template>
        <v-card>
          <v-card-title class="indigo white--text display-1 text-decoration-underline">
            Axes
          </v-card-title>
          <v-row
            class="pa-4"
            justify="space-between"
          >
            <v-col>
              <v-treeview
                dense
                hoverable
                :items="this.KPIdata()"
                open-on-click
                transition
              >
                <template v-slot:prepend="{ item }">
                    <v-icon v-if="item.id == 'Rien'">
                    mdi-cancel
                  </v-icon>
                  <v-icon v-else-if="!item.children">
                    mdi-file
                  </v-icon>
                  <v-icon v-else-if="item.id != 'Rien'">
                    mdi-axis-arrow
                  </v-icon>
                </template>
                <template slot="label" slot-scope="{ item }">
                    <a @click="teste(item)">{{ item.name }}</a>
                </template>
              </v-treeview>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import GroupChart3 from './GroupChart3.vue'
export default {
  components: { GroupChart3 },
    name: 'Datatable',
data () {
      return {
        headers: [
          { text: 'Nom', align: 'start', value: 'name',},
          { text: 'Santé', value: 'result.0.0.health'},
          { text: 'Tendance', value: 'result.0.0.tendancy'},
          { text: 'Date la plus proche', value: 'result.0.0.date'},
          { text: 'Valeur', value: 'result.0.0.value'},
          { text: 'Minimum', value: 'result.0.0.minimum'},
          { text: 'Maximum', value: 'result.0.0.maximum'},
          { text: 'Objectif', value: 'result.0.0.objective'},
          { text: 'Cacher', value: 'cacher'}
        ],
        headers2: [
          { text: 'Date', align: 'start',  value: 'datee'},
          { text: 'Valeur', value: 'valeure'},
          { text: 'Objectif', value: 'objectife'},
          { text: 'Minimum', value: 'minimume'},
          { text: 'Maximum', value: 'maximume'},
        ],
        items2 : [],
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        c : 0,
        idt : "",
        chdate : "0",
        dialog : false,
        dialogb : false,
      }
    },
    computed: {
      ...mapState(['kpi']),
      ...mapState(['axis']),
      ...mapState(['tabvalueoneyear']),
    },
    methods : {
      parseDate(date){
        var returnedDate = date.split('T')
        return(returnedDate[0]);
      },
      icon(tendancy){
        if (tendancy > 0){
          return "mdi-arrow-top-right"
        } 
        if (tendancy == 0){
          return "mdi-equal"
        }
        if (tendancy < 0){
          return "mdi-arrow-bottom-right"
        }
      },
      health(h){
        if (h > 0){
          return "mdi-thumb-up"
        } 
        if (h == 0){
          return "mdi-thumbs-up-down"
        }
        if (h < 0){
          return "mdi-thumb-down"
        }
      },
      loaddatadate(){
        this.chdate = this.chdate+1
        if (this.c%2 != 0){ 
          var data = {
            kpiID : this.idt,
            date : this.picker,
          }
          this.$store.dispatch('getOneKPI', data)
        } else {
          this.$store.dispatch('getKPIDate', this.picker)
        }
      },
      loaddatadatecacher(datetemp){
        if (this.c%2 != 0){ 
          var data = {
            kpiID : this.idt,
            date : datetemp,
          }
          this.$store.dispatch('getOneKPI', data).then(() => {
            this.picker = datetemp
          })
        } else {
          this.$store.dispatch('getKPIDate', datetemp).then(() => {
            this.picker = datetemp
          })
        }
      },
      test(id){
        this.idt = id
        if (this.c%2 == 0){ 
          var data = {
            kpiID : id,
            date : this.picker,
          }
          console.log(this.picker);
          this.$store.dispatch('getOneKPI', data).then(
            this.$store.dispatch('getAxis', this.kpi.data[0].kpiID).then(
            )
          )
          
          this.c = this.c+1
        } else {
          if (this.chdate == 0){
          this.$store.dispatch('resetKPI')
          this.c = this.c+1
          } else {
            this.$store.dispatch('getKPIDate', this.picker)
            this.c = this.c+1
          }
        }
      },
      resetwithoutid(){
        this.c = this.c+1
        this.test(this.idt)
      },
      teste(item) {
        if (typeof item.children == "object"){
          console.log('Not a leaf', item)
        } else {
          var data
          console.log('A LEAF', item.name)
          console.log("ID KPI : ", this.kpi.data[0].kpiID, ", NAME + ID AXIS :", item.name, " + ", item.id );
          console.log(typeof(item.id));
          if (typeof(item.id) == "number"){
            data = {
              kpiID : this.kpi.data[0].kpiID,
              childrenID : item.id,
              date : this.picker
            }
            this.$store.dispatch('getAxisValue', data)
          } else {
            console.log(item.id);
            this.$store.dispatch('niveaudeux', item.id).then(
              this.$store.dispatch('getTabNiveau', item.id)
            )
          }

          }
        },
      KPIdata() {
        if (typeof this.axis.data[0] == "object"){
          return this.axis.data

        } else {
          return [
            {name : "Aucun axe pour ce kpi/choisissez un thème",
            id : "Rien"
            }]
        } 
      },
      reset(){
        this.chdate = 0
        this.picker = new Date().toISOString().split('T')[0]
        this.$store.dispatch('resetKPI')
        this.c = 0
      },
      appelcalendar(){
          var data = {
            kpiID : this.idt,
            date : this.picker,
          }
        this.$store.dispatch('getTabValueOneYear', data)   
      },
      tabcacher(){
        if (this.chdate != 0){
          this.loaddatadate()
        }
      }
    },
    watch : {
      tabvalueoneyear : {
        handler : function () {
          this.items2 = [],
          // console.log(this.$store.state.kpi),
          this.tabvalueoneyear.data[0].result[0].forEach(el => {
            console.log(el);
            if (!this.items2.includes({
              datee : this.parseDate(el.date),
              valeure : el.value,
              objectife : el.objective,
              minimume : el.minimum,
              maximume : el.maximum
            })){
            this.items2.push({
              datee : this.parseDate(el.date),
              valeure : el.value,
              objectife : el.objective,
              minimume : el.minimum,
              maximume : el.maximum
            })}
          })
        },
        deep : true
      }, 
    },
}
</script>
<style scoped>
  .mt-8 {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>