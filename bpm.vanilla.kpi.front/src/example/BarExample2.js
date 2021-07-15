import { Bar } from 'vue-chartjs'
import {mapState} from 'vuex'

export default {
  extends: Bar,
  name: "Bar",
  computed: {
    ...mapState(['tabniveau']),
    chartData() {
      var labels = []
      var Adata = []
      var dataset = []
      console.log("tabniveau ", this.tabniveau.data);
      this.tabniveau.data.forEach(element => {
        Adata = []
        var returnedDate = element.date.split('T')
        if (!labels.includes(returnedDate[0])){
          labels.push(returnedDate[0])
        }
        Adata.push(element.value)
        var datas =
        {
          label : element.axis[1].label,
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
    tabniveau : {
      handler :function () {
        this.renderChart(this.chartData,{ responsive: true, maintainAspectRatio: false });
    },
    deep: true
    }
}
}