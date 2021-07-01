import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        },
        {
          label: 'Data Two',
          backgroundColor: '#f80909',
          data: [20, 25, 11, 9, 12, 40, 69, 86, 42, 0, 42, 21]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false, align : "center"})
  }
}