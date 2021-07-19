import { Doughnut } from 'vue-chartjs'
import {mapState} from 'vuex'

export default {
  extends: Doughnut,
  name: "Doughnut2",
  computed: {
    ...mapState(['tabniveau']),
    chartData() {
      var labels = []
      var Adata = []
      var background = []
      // var c = 0
      this.tabniveau.data.forEach(element => {
        // if (element.value == 0){
        //   c = c+1
        // } else {
          labels.push(element.axis[1].label)
          Adata.push(element.value)
          background.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))
        // }
      });
      // if (c > 0){
      //   labels.push(c.toString() + " autres membres de valeur = 0"),
      //   Adata.push(0)
      //   background.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))
      // }

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
  methods : {
    bool(){
      if (this.tabniveau.data.length >= 10){
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false, align : "center",
    legend: {
      display: this.bool()
  }})
  },
  watch : {
    tabniveau : {
      handler :function () {
        this.renderChart(this.chartData,{ responsive: true, maintainAspectRatio: false,
          legend: {
            display: this.bool()
        } });
    },
    deep: true
    }
}
}