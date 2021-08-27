import { HorizontalBar } from 'vue-chartjs'
import {mapState} from 'vuex'

export default {
  extends: HorizontalBar,
  name: "HorizontalBar2",
  computed: {
    ...mapState(['tabniveau']),
    chartData() {
      var labels = []
      var Adata = []
      var dataset = []
      // var c = 0
      this.tabniveau.data.forEach(element => {
        Adata = []
        var returnedDate = element.date.split('T')
        if (!labels.includes(returnedDate[0])){
          labels.push(returnedDate[0])
        }
        // if (element.value == 0){
        //   c = c+1
        // } else {
          Adata.push(element.value)
          var datas =
          {
            label : element.axis[1].label,
            data : Adata,
            backgroundColor : '#'+(Math.random()*0xFFFFFF<<0).toString(16)
          }
          dataset.push(datas)
        // }
      });
      // if (c > 0){
      //   dataset.push(
      //   {
      //     label : [c.toString() + " autres membres de valeur = 0"],
      //     data : [0],
      //     backgroundColor : '#'+(Math.random()*0xFFFFFF<<0).toString(16)
      //   })
      // }
      return {
        labels : labels,
        datasets:
          dataset

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