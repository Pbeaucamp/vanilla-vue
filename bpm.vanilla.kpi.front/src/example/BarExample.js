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
      var dernierlabel = " "
      var valeur = 0
      this.axisvalues.data.forEach(element => {
        console.log(element.axis[1].label)
        Adata = []
        if (dernierlabel == " "){
          dernierlabel = element.axis[0].label
          console.log("PREMIER NOM");
        }
        if (element.axis[0].label != dernierlabel){
          labele.push(dernierlabel)
          console.log("CHANGEMENT NOM");
          dernierlabel = element.axis[0].label
          Adata.push(valeur)
          var datas =
          {
            label : labele,
            data : Adata,
            backgroundColor : '#'+(Math.random()*0xFFFFFF<<0).toString(16)
          }
          dataset.push(datas)
          labele = []
          valeur = 0
        } else {
          console.log("MEME NOM");
          valeur = valeur + element.value
          console.log(valeur);
        }
      })
      labele.push(dernierlabel)
      Adata.push(valeur)
      var datas = 
      {
        label : labele,
        data : Adata,
        backgroundColor : '#'+(Math.random()*0xFFFFFF<<0).toString(16)
      }
      dataset.push(datas)
      console.log(dataset);
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