<template>
  <div class="container">
    <v-container class="mt-8">
        <v-layout row wrap>
            <v-layout column wrap>
                <v-flex xs1 sm1 md1 lg1 v-for="item in TabType" :key="item.name">
                    <v-btn dark text class="my-3 indigo" @click="changeType(item.Type)"><v-icon>{{item.Icon}}</v-icon></v-btn>
                </v-flex>
            </v-layout>
            <v-flex xs10 sm10 md10 lg10>
                <div class="Chart" v-if="ChartType == 'Barchart'">
                <h2 style="text-align:center;">{{Titre}}</h2>
                <bar-example/>
                </div>

                <div class="Chart" v-if="ChartType == 'Horizontal Barchart'">
                    <h2 style="text-align:center;">{{Titre}}</h2>
                    <horizontal-bar-example/>
                </div>

                <div class="Chart" v-if="ChartType == 'Linechart'">
                <h2 style="text-align:center;">{{Titre}}</h2>
                <line-example/>
                </div>

                <div class="Chart" v-if="ChartType == 'Doughnutchart'">
                <h2 style="text-align:center;">{{Titre}}</h2>
                <doughnut-example/>
                </div>

                <div class="Chart" v-if="ChartType == 'Piechart'">
                <h2 style="text-align:center;">{{Titre}}</h2>
                <pie-example/>
                </div>

                <div class="Chart" v-if="ChartType == 'Gauge'">
                <h2 style="text-align:center;">{{Titre}}</h2>
                <gauge />
                </div>
            </v-flex>
            </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BarExample from '../example/BarExample'
  import LineExample from '../example/LineExample'
  import DoughnutExample from '../example/DoughnutExample'
  import PieExample from '../example/PieExample'
  import HorizontalBarExample from '../example/HorizontalBarExample'
  import Gauge from './Gauge.vue'
  
  export default {
    components: {
      BarExample,
      LineExample,
      DoughnutExample,
      PieExample,
      HorizontalBarExample,
      Gauge
    },
    computed: {
    ...mapState(['kpioraxis']),
    ...mapState(['kpi']),
    ...mapState(['axis']),
    ...mapState(['childrenid']),
    ...mapState(['typechart']),
    },
    data() {
        return {
            TabType : [
            {Type : "Barchart",
            Icon : "mdi-chart-bar"},
            {Type : "Linechart",
            Icon : "mdi-chart-line"},
            {Type : "Doughnutchart",
            Icon : "mdi-chart-donut"},
            {Type : "Piechart",
            Icon : "mdi-chart-pie"},
            {Type : "Horizontal Barchart",
            Icon : "mdi-align-horizontal-left"},
            {Type : "Gauge",
            Icon : "mdi-gauge"},
            ],
            ChartType : "Barchart",
            Titre : "Graph"
        }
    },
    methods : {
        changeType(type) {
            this.ChartType = type,
            this.$store.dispatch('getTypechart', type).then(
              //console.log(this.typechart.data)
            )
        }
    },
    mounted(){
      this.ChartType = this.typechart.data
    },
    watch : {
      childrenid :{
        handler : function () {
            var children = this.$store.state.childrenid.data
            var axistemp = this.$store.state.axis.data;
            var parentName
            axistemp.forEach(element => {
              element.children.forEach(el => {
                if (el.id == children){
                  parentName = element.name
                }
              })
            });
            this.Titre = this.kpi.data[0].name + " pour " + parentName + ", " + this.kpi.data[0].result[0][0].date.split(['T'])[0]
        },
        deep : true
      },
      kpioraxis :{
        handler : function () {
          //console.log(this.kpioraxis.data);
          if (this.kpioraxis.data == "KPI") {
            this.ChartType = "Gauge"  
          } else if (this.kpioraxis.data == "AXIS") {
            this.ChartType = "Barchart"
          }
        },
        deep : true
      },

      kpi : {
        handler : function () {
          if (this.kpi.data.length == 1) {
            this.ChartType = "Gauge"
            this.Titre = this.kpi.data[0].name + ", " + this.kpi.data[0].result[0][0].date.split(['T'])[0]
          } else {
            this.ChartType = this.typechart.data
            this.Titre = "Indicateurs de " + this.$store.state.temp.data.theme
          }
        },
        deep : true
      },
    }
  }
</script>

<style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  h1 {
    font-family: 'Helvetica', Arial;
    color: #464646;
    text-transform: uppercase;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 15px;
    font-size: 28px;
    margin-top: 0;
  }
  .Chart {
    padding: 20px;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, .4);
    border-radius: 20px;
  }
</style>
