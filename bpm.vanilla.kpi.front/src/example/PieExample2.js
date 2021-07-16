import { Pie } from 'vue-chartjs'
import {mapState} from 'vuex'

export default {
  extends: Pie,
  name: "Pie2",
  computed: {
    ...mapState(['tabniveau']),
    chartData() {
      var labels = []
      var Adata = []
      var background = []
      var c = 0
      this.tabniveau.data.forEach(element => {
        if (element.value == 0){
          c = c+1
        } else {
          labels.push(element.axis[1].label)
          Adata.push(element.value)
          background.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        }
      });
      if (c > 0){
        labels.push(c.toString() + " autres membres de valeur = 0"),
        Adata.push(0)
        background.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))
      }

      return {
        labels : labels,
        datasets: [
          {
            backgroundColor : background
          ,
          data : Adata
          }
        ]
      };
    }
  },
  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false, align : "center"})
  },
  watch : {
    tabniveau :{
        handler :function () {
            this.renderChart( this.chartData,{ responsive: true, maintainAspectRatio: false });
        },
        deep: true
    }
}
}