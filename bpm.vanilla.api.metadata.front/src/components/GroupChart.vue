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

                <bar-example :Axe_X="Axe_X" :series="series" :selectedColumns="selectedColumns" />
                </div>

                <div class="Chart" v-if="ChartType == 'Horizontal Barchart'">

                    <horizontal-bar-example  :Axe_X="Axe_X" :series="series" :selectedColumns="selectedColumns" />
                </div>

                <div class="Chart" v-if="ChartType == 'Linechart'">

                <line-example :Axe_X="Axe_X" :series="series" :selectedColumns="selectedColumns" />
                </div>

                <div class="Chart" v-if="ChartType == 'Doughnutchart'">

                <doughnut-example :Axe_X="Axe_X" :series="series" :selectedColumns="selectedColumns" />
                </div>

                <div class="Chart" v-if="ChartType == 'Piechart'">

                <pie-example :Axe_X="Axe_X" :series="series" :selectedColumns="selectedColumns" />
                </div>


            </v-flex>
            </v-layout>
    </v-container>
  </div>
</template>

<script>
  //import {mapState} from 'vuex'
  import BarExample from '../example/BarExample'
  import LineExample from '../example/LineExample'
  import DoughnutExample from '../example/DoughnutExample'
  import PieExample from '../example/PieExample'
  import HorizontalBarExample from '../example/HorizontalBarExample'

  
  export default {
    components: {
      BarExample,
      LineExample,
      DoughnutExample,
      PieExample,
      HorizontalBarExample,

    },
    props : {
      selectedColumns : Array,
      Axe_X : Object,
      series : Array,
    },
    computed: {

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
            ],
            ChartType : "Barchart",
            Titre : "Graph"
        }
    },
    methods : {
        changeType(type) {
          this.ChartType = type;
        }
    },
    mounted(){
      this.ChartType ="Barchart";
    },

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
