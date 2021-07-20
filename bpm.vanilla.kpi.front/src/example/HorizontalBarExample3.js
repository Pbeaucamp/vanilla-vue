import { HorizontalBar } from 'vue-chartjs'
import {mapState} from 'vuex'

export default {
  extends: HorizontalBar,
  name: "HorizontalBar",
  computed: {
    ...mapState(['kpi']),
    ...mapState(['tabvalueoneyear']),
    chartData() {
      var labels = []
      var Adata = []
      var dataset = []

      this.kpi.data.forEach(element => {
        Adata = []
        element.result[0].forEach(ele => {       
        var returnedDate = ele.date.split('T')
        if (!labels.includes(returnedDate[0])){
            labels.push(returnedDate[0])
        }
        Adata.push(ele.value)
        });
        var datas =
        {
        label : element.name,
        data : Adata,
        backgroundColor : '#'+(Math.random()*0xFFFFFF<<0).toString(16),

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
    kpi :{
      handler :function () {
          this.renderChart( this.chartData,{ responsive: true, maintainAspectRatio: false});
      },
      deep: true
    },
    tabvalueoneyear :{
        handler :function () {
            this.renderChart( this.chartData,{ responsive: true, maintainAspectRatio: false});
        },
        deep: true
      },
    }   
}