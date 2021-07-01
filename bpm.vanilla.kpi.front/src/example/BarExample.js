import { Bar } from 'vue-chartjs'
import {mapState} from 'vuex'

export default {
  extends: Bar,
  name: "Bar",
  computed: {
    ...mapState(['kpi']),
    ...mapState(['axisvalues']),
    chartData() {
      var labels = []
      var Adata = []
      var dataset = []

      this.kpi.data.forEach(element => {
        Adata = [],
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
          backgroundColor : '#'+(Math.random()*0xFFFFFF<<0).toString(16)
        }
        dataset.push(datas)
      });

      return {
        labels : labels,
        datasets:
          dataset

      };
    },
    chartDataAxis() {
      var labele = []
      var labels = []
      var Adata = []
      var dataset = []

      console.log(this.axisvalues.data);
      this.axisvalues.data.forEach(element => {
        Adata = [],
        console.log(element.axis[0].label)
        if (!labele.includes(element.axis[0].label)){
          labele.push(element.axis[0].label)
        }
        Adata.push(element.value)
        var datas =
        {
          label : labele,
          data : Adata,
          backgroundColor : '#'+(Math.random()*0xFFFFFF<<0).toString(16)
        }
        dataset.push(datas)
      });

      return {
        labels : labels,
        datasets:
          dataset

      };
    }
  },
  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false, align : "center"})
  },
  watch : {
    kpi :{
        handler :function () {
            this.renderChart( this.chartData,{ responsive: true, maintainAspectRatio: false });
        },
        deep: true
    },
    axisvalues : {
      handler :function () {
        this.renderChart( this.chartDataAxis,{ responsive: true, maintainAspectRatio: false });
    },
    deep: true
    }
}
}