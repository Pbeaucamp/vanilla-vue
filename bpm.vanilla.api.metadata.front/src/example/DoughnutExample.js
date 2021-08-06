import { Doughnut } from 'vue-chartjs'
import {mapState} from 'vuex'

export default {
  extends: Doughnut,
  name: "Doughnut",
  computed: {
    ...mapState(['kpi']),
    ...mapState(['axis']),
    ...mapState(['axisvalues']),
    ...mapState(['childrenid']),
    ...mapState(['kpioraxis']),
    ...mapState(['hidedata']),
    chartData() {
      var labels = []
      var Adata = []
      var background = []

      this.kpi.data.forEach(element => {
        if (element.Cacher != true){
          element.result[0].forEach(ele => {       
          background.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))
          if (labels.includes(element.name)){
            var i = labels.indexOf(element.name)
            Adata[i] = Adata[i] + ele.value
          } else {
          labels.push(element.name)
          Adata.push(ele.value)
        }
        });
      }
      });

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
    },
    chartDataAxis() {
      var labele = []
      var Adata = []
      var background = []
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
            console.log("CA FONCTIONNE REELLEMENT ");
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
        if (dernierlabel == " "){
          dernierlabel = element.axis[i].label
          // console.log("PREMIER NOM");
        }
        if (element.axis[i].label != dernierlabel){
          labele.push(dernierlabel)
          // console.log("CHANGEMENT NOM");
          dernierlabel = element.axis[i].label
          Adata.push(valeur)
          background.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))
          valeur = element.value
        } else {
          // console.log("MEME NOM");
          valeur = valeur + element.value
          // console.log(valeur);
        }
      })
      labele.push(dernierlabel)
      Adata.push(valeur)
      background.push('#'+(Math.random()*0xFFFFFF<<0).toString(16))
      // console.log(dataset);
      var label2 = []
      var data2 = []
      var c = 0
      Adata.forEach(el => {
        if (el != 0){
          data2.push(el)
          label2.push(labele[Adata.indexOf(el)])
        } else {
          c = c+1
        }
      })
      if (c > 0){
        data2.push(0),
        label2.push(c.toString() + " autres membres de valeur = 0")
      }

      return {
        labels : label2,
        datasets:[
          {
            backgroundColor : background
          ,
          data : data2
          }
        ]
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
    hidedata : {
      handler :function(){
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