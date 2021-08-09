import { Bar } from 'vue-chartjs'


export default {
  extends: Bar,
  name: "Bar",
  props : {
    selectedColumns : Array,
    Axe_X : Object,
    series : Array,
  },

  computed: {

  },
  methods : {
    getDatas() {
      var labels = [];

      var datasets = []; 
      /*
      Pour chaque série  il faut un dataset du type : 
              datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]  
      */
      var localSeries = this.series.filter(el => !(Object.keys(el.column).length === 0) );


      for (const serie of localSeries) {

        datasets.push( {
          label: serie.column.name,
          backgroundColor : '#'+(Math.random()*0xFFFFFF<<0).toString(16),
          data: [],
          scaleOverride:true, scaleStartValue:0          
        })
      }


      /*
      this.$store.state.queryResult.forEach( el => {
        if ( !labels.includes(el[`${this.Axe_X.parent}:${this.Axe_X.name}`]) ) {
            labels.push(el[`${this.Axe_X.parent}:${this.Axe_X.name}`]);
          
          
          //var indexOfAxe = labels.indexOf(el[`${this.Axe_X.parent}:${this.Axe_X.name}`]);
          //console.log("indexOfAxe " + el[`${this.Axe_X.parent}:${this.Axe_X.name}`] + " : " + indexOfAxe);
          for (const serie of localSeries) {
            // ajouter traitement conditionnel selon l'aggrégation 
            // SOmme 
            //datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe] += el[`${serie.column.parent}:${serie.column.name}`];
            //Comtpe 
            //console.log("find : " + datasets.find(dataset => dataset.label == serie.column.name));
            datasets.find(dataset => dataset.label == serie.column.name).data.push(1);
            //this.manageCase(serie)
          }
        } else {
          var indexOfAxe = labels.indexOf(el[`${this.Axe_X.parent}:${this.Axe_X.name}`]);
          for (const serie of localSeries) {
            // ajouter traitement conditionnel selon l'aggrégation 
            // SOmme 
            //datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe] += el[`${serie.column.parent}:${serie.column.name}`];
            //Comtpe 
            //console.log("find : " + datasets.find(dataset => dataset.label == serie.column.name));
            datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe] += 1;
          }
        }




      })
      */


      return this.manageDatasets(datasets,labels,localSeries);
      //return {labels : labels , datasets : datasets};
    },

    manageDatasets(datasets,labels,localSeries) {
      //console.log("MANAGE COUNT HERERRERE ! " + JSON.stringify(datasets));
      this.$store.state.queryResult.forEach( el => {
        if ( !labels.includes(el[`${this.Axe_X.parent}:${this.Axe_X.name}`]) ) {
            labels.push(el[`${this.Axe_X.parent}:${this.Axe_X.name}`]);
          
          var indexOfAxe;
          //var indexOfAxe = labels.indexOf(el[`${this.Axe_X.parent}:${this.Axe_X.name}`]);
          //console.log("indexOfAxe " + el[`${this.Axe_X.parent}:${this.Axe_X.name}`] + " : " + indexOfAxe);
          for (const serie of localSeries) {
            // ajouter traitement conditionnel selon l'aggrégation 
            // SOmme 
            //datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe] += el[`${serie.column.parent}:${serie.column.name}`];
            //Comtpe 
            //console.log("find : " + datasets.find(dataset => dataset.label == serie.column.name));

            //datasets.find(dataset => dataset.label == serie.column.name).data.push(0);

            indexOfAxe = labels.length - 1;
            switch (serie.agg) {
              case 'Compte' :
                datasets.find(dataset => dataset.label == serie.column.name).data.push(0);
                break;
              case 'Somme' : 
                datasets.find(dataset => dataset.label == serie.column.name).data.push(0);
                break;
              case 'Maximum' :
                datasets.find(dataset => dataset.label == serie.column.name).data.push(parseFloat(el[`${serie.column.parent}:${serie.column.name}`]));
                break;
              case 'Minimum' : 
                datasets.find(dataset => dataset.label == serie.column.name).data.push(parseFloat(el[`${serie.column.parent}:${serie.column.name}`]));
                break;
              case "Moyenne" : 
                datasets.find(dataset => dataset.label == serie.column.name).data.push({sum : 0, nb : 0 });
                break;
                case "Compte Distinct" : 
                datasets.find(dataset => dataset.label == serie.column.name).data.push([]);
                break;                
              default: 
                console.log("Error no agg assigned.");              
            }
            //console.log("Label : " + labels[indexOfAxe] + " | indexOfAxe : " + indexOfAxe + " | labels : " + labels + " | el[`${this.Axe_X.parent}:${this.Axe_X.name}`] : " + (el[`${this.Axe_X.parent}:${this.Axe_X.name}`]) + " | el[`${serie.column.parent}:${serie.column.name}`] : " + el[`${serie.column.parent}:${serie.column.name}`] );
            //console.log(" datasets.find(dataset => dataset.label == serie.column.name).data : " + datasets.find(dataset => dataset.label == serie.column.name).data);
            this.manageCase(serie,indexOfAxe,datasets,el)
          }
        } else {
          indexOfAxe = labels.indexOf(el[`${this.Axe_X.parent}:${this.Axe_X.name}`]);
          for (const serie of localSeries) {
            // ajouter traitement conditionnel selon l'aggrégation 

            //datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe] += el[`${serie.column.parent}:${serie.column.name}`];

            //console.log("find : " + datasets.find(dataset => dataset.label == serie.column.name));

            this.manageCase(serie,indexOfAxe,datasets,el)

            //datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe] += 1;
          }
        }
      })

      
      for (const serie of localSeries ) {
        if (serie.agg == "Moyenne") {
          //datasets.find(dataset => dataset.label == serie.column.name).data.forEach( data => data = data/this.$store.state.queryResult.length );
          for (let i = 0; i < datasets.find(dataset => dataset.label == serie.column.name).data.length; i++) {  
            datasets.find(dataset => dataset.label == serie.column.name).data[i] = ( parseFloat(datasets.find(dataset => dataset.label == serie.column.name).data[i].sum) / datasets.find(dataset => dataset.label == serie.column.name).data[i].nb);
          }
        }

        if (serie.agg == "Compte Distinct") {
          datasets.find(dataset => dataset.label == serie.column.name).data.forEach( data => data = data.length );
          for (let i = 0; i < datasets.find(dataset => dataset.label == serie.column.name).data.length; i++) {  
            datasets.find(dataset => dataset.label == serie.column.name).data[i] = datasets.find(dataset => dataset.label == serie.column.name).data[i].length;
          }
        }
      }

      return {labels : labels , datasets : datasets};
    },
    manageCase(serie,indexOfAxe,datasets,el) {
      //console.log("MANAGE  CASE CALLED : " + JSON.stringify(datasets));
      
      switch(serie.agg) {
        case 'Compte' :
          datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe] += 1;
          break;
        case 'Somme' : 
          datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe] += parseFloat(el[`${serie.column.parent}:${serie.column.name}`]);
          break;
        case 'Maximum' :
          var oldVal = datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe];
          var newVal = el[`${serie.column.parent}:${serie.column.name}`];
          if ( parseFloat(oldVal) < parseFloat(newVal)) {
            datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe] = newVal;
          } 
          break;
        case 'Minimum' : 
          var oldValue = datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe];
          var newValue = el[`${serie.column.parent}:${serie.column.name}`];
          if ( parseFloat(oldValue) > parseFloat(newValue)) {
            datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe] = newValue;
          }         
          break;
        case 'Moyenne' : 
          
          datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe].sum += parseFloat(el[`${serie.column.parent}:${serie.column.name}`]);
          datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe].nb +=1;
          break;
        case 'Compte Distinct' : 
          if ( !datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe].includes( el[`${serie.column.parent}:${serie.column.name}`] ) ) {
            datasets.find(dataset => dataset.label == serie.column.name).data[indexOfAxe].push( el[`${serie.column.parent}:${serie.column.name}`] );
          }
          break;
        default: 
          console.log("Error no agg assigned.");

      }

    }

  },
  mounted () {
    /*
    console.log("Thing mounted");
    console.log("QueryResult : " + JSON.stringify(this.$store.state.queryResult));
    console.log("Seleccted columns : " + JSON.stringify(this.selectedColumns));
    console.log("AXE X : " + JSON.stringify(this.Axe_X) );
    console.log("series : " + JSON.stringify(this.series) );
    console.log("Label bis : " + JSON.stringify(this.getDatas()));
    */
    var graphDatas = this.getDatas();
    this.renderChart( graphDatas, { responsive: true, maintainAspectRatio: false, scaleOverride:true, scaleStartValue:0,  yAxes: [{ ticks: {beginAtZero: true}}]});
    /*
    this.renderChart(this.choixKPIorAxis, {responsive: true, maintainAspectRatio: false, align : "center",
      legend: {
        display: this.bool()
    }})
    */
  },
  watch : {
    Axe_X : {
      handler : function () {
        var graphDatas = this.getDatas();
        this.renderChart( graphDatas, { responsive: true, maintainAspectRatio: false, scaleOverride:true, scaleStartValue:0});  
      },
      deep: true,

    },
    series : {
      handler : function () {
        var graphDatas = this.getDatas();
        this.renderChart( graphDatas, { responsive: true, maintainAspectRatio: false, scaleOverride:true, scaleStartValue:0});   
      },
      deep: true,

    },
    queryResult : {
      handler : function () {
        var graphDatas = this.getDatas();
        this.renderChart( graphDatas, { responsive: true, maintainAspectRatio: false, scaleOverride:true, scaleStartValue:0});   
      },
      deep: true,

    },
  },
}
