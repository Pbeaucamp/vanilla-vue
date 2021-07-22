import { Pie } from 'vue-chartjs'
import {mapState} from 'vuex'

export default {
  extends: Pie,
  name: "Pie",
  computed: {
    ...mapState(['kpi']),
    ...mapState(['tabvalueoneyear']),
    chartData() {
        var labels = []
        var Adata = []
        var dataset = []
        var background = []
  
        this.kpi.data.forEach(element => {
          Adata = []
          background = []
          element.result[0].forEach(ele => {       
          var returnedDate = ele.date.split('T')
          if (!labels.includes(returnedDate[0])){
              labels.push(returnedDate[0])
              background.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))
          }
          Adata.push(ele.value)
          });
          var datas =
          {
            label : element.name,
            data : Adata,
            backgroundColor : background
          }
          dataset.push(datas)
        });
  
        return {
          labels : labels,
          datasets: 
            dataset,
        };
      },
  },
  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false, align : "center"})
  },
  watch : {
    // kpi :{
    //     handler :function () {
    //         this.renderChart( this.chartData,{ responsive: true, maintainAspectRatio: false});
    //     },
    //     deep: true
    // },
    tabvalueoneyear :{
        handler :function () {
            this.renderChart( this.chartData,{ responsive: true, maintainAspectRatio: false});
        },
        deep: true
      },
    } 
}