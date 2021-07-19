import { Line } from 'vue-chartjs'
import {mapState} from 'vuex'

export default {
  extends: Line,
  name: "Linechart",
  computed: {
    ...mapState(['kpi']),
    ...mapState(['axis']),
    ...mapState(['axisvalues']),
    ...mapState(['childrenid']),
    ...mapState(['kpioraxis']),
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
      var i = 0
      console.log("coucou ", this.axis.data);
      console.log(this.axisvalues);
      console.log(this.childrenid.data);
      this.axis.data.forEach(element => {
        var id = element.children[0].id
        var compteur = 0
        console.log(id);
        element.children.forEach(el => {
          console.log(el);
          if (el.id == this.childrenid.data){
            i = compteur
          }
          compteur = compteur +1
        })
      });
      

      // console.log(this.axisvalues.data);
      var dernierlabel = " "
      var valeur = 0
      this.axisvalues.data.forEach(element => {
        // console.log(element.axis[i].label)
        Adata = []
        if (dernierlabel == " "){
          dernierlabel = element.axis[i].label
          // console.log("PREMIER NOM");
        }
        if (element.axis[i].label != dernierlabel){
          labele.push(dernierlabel)
          // console.log("CHANGEMENT NOM");
          dernierlabel = element.axis[i].label
          Adata.push(valeur)
          var datas =
          {
            label : labele,
            data : Adata,
            backgroundColor : '#'+(Math.random()*0xFFFFFF<<0).toString(16)
          }
          dataset.push(datas)
          labele = []
          Adata = []
          valeur = element.value
        } else {
          // console.log("MEME NOM");
          valeur = valeur + element.value
          // console.log(valeur);
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
      var dataset2 = []

      var c = 0
      dataset.forEach(el => {
        if (el.data[0] != 0){
          dataset2.push(el)
        } else {
          c = c+1
        }
      })
      console.log(dataset);
      if (c > 0){
        dataset2.push(
          {
            label : [c.toString() + " autres membres de valeur = 0"],
            data : [0],
            backgroundColor : '#'+(Math.random()*0xFFFFFF<<0).toString(16)
          }
        )
      }
      // console.log(dataset);
      return {
        labels : labels,
        datasets:
          dataset2
      };
    },
    choixKPIorAxis(){
      if (this.kpioraxis.data == "AXIS"){
        return this.chartDataAxis
      } else {
        return this.chartData
      }
    }
  },
  methods : {
    bool(){
      if (this.kpioraxis.data == "AXIS"){
        if (this.axisvalues.data.length >= 10){
          return false
        } else {
          return true
        }
      } else {
        if (this.kpi.data.length >= 10){
          return false
        } else {
          return true
        }
      }
    }    
  },
  mounted () {
    this.renderChart(this.choixKPIorAxis, {responsive: true, maintainAspectRatio: false, align : "center",
    legend: {
      display: this.bool()
  }})
  },
  watch : {
    kpi :{
        handler :function () {
            this.renderChart( this.chartData,{ responsive: true, maintainAspectRatio: false,
              legend: {
                display: this.bool()
            } });
        },
        deep: true
    },
    axisvalues : {
      handler :function () {
        this.renderChart(this.chartDataAxis,{ responsive: true, maintainAspectRatio: false,
          legend: {
            display: this.bool()
        } });
    },
    deep: true
    }
}
}