<template>
  <div class="container">
    <v-container class="mt-8">
        <v-layout row wrap>
            <v-layout column wrap>
                <v-flex xs1 sm1 md1 lg1 v-for="item in TabType" :key="item.name">
                    <v-btn dark text class="my-2 indigo" @click="changeType(item.Type)"><v-icon>{{item.Icon}}</v-icon></v-btn>
                </v-flex>
            </v-layout>
            <v-flex xs10 sm10 md10 lg10>
                <div class="Chart" v-if="ChartType == 'Barchart'">
                <h1 style="text-align:center;">Barchart</h1>
                <bar-example/>
                </div>

                <div class="Chart" v-if="ChartType == 'Horizontal Barchart'">
                    <h1 style="text-align:center;">Horizontal Barchart</h1>
                    <horizontal-bar-example/>
                </div>

                <div class="Chart" v-if="ChartType == 'Linechart'">
                <h1 style="text-align:center;">Linechart</h1>
                <line-example/>
                </div>

                <div class="Chart" v-if="ChartType == 'Doughnutchart'">
                <h1 style="text-align:center;">Doughnutchart</h1>
                <doughnut-example/>
                </div>

                <div class="Chart" v-if="ChartType == 'Piechart'">
                <h1 style="text-align:center;">Piechart</h1>
                <pie-example/>
                </div>

                <div class="Chart" v-if="ChartType == 'Radarchart'">
                <h1 style="text-align:center;">Radarchart</h1>
                <radar-example/>
                </div>

                <div class="Chart" v-if="ChartType == 'Polarareachart'">
                <h1 style="text-align:center;">Polararea</h1>
                <polar-area-example/>
                </div>

                <div class="Chart" v-if="ChartType == 'Bubblechart'">
                <h1 style="text-align:center;">Bubblechart</h1>
                <bubble-example />
                </div>

                <div class="Chart" v-if="ChartType == 'Scatterchart'">
                <h1 style="text-align:center;">Scatter Chart</h1>
                <scatter-example />
                </div>
            </v-flex>
            </v-layout>
    </v-container>
  </div>
</template>

<script>
  import BarExample from '../example/BarExample'
  import LineExample from '../example/LineExample'
  import DoughnutExample from '../example/DoughnutExample'
  import PieExample from '../example/PieExample'
  import RadarExample from '../example/RadarExample'
  import PolarAreaExample from '../example/PolarAreaExample'
  import BubbleExample from '../example/BubbleExample'
  import ScatterExample from '../example/ScatterExample'
  import HorizontalBarExample from '../example/HorizontalBarExample'
  export default {
    components: {
      BarExample,
      LineExample,
      DoughnutExample,
      PieExample,
      RadarExample,
      PolarAreaExample,
      BubbleExample,
      ScatterExample,
      HorizontalBarExample
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
            {Type : "Radarchart",
            Icon : "mdi-graphql"},
            {Type : "Polarareachart",
            Icon : "mdi-chart-donut-variant"},
            {Type : "Bubblechart",
            Icon : "mdi-chart-bubble"},
            {Type : "Scatterchart",
            Icon : "mdi-chart-scatter-plot"},
            {Type : "Horizontal Barchart",
            Icon : "mdi-align-horizontal-left"},
            ],
            ChartType : "Barchart"
        }
    },
    methods : {
        changeType(type) {
            this.ChartType = type
        }
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
