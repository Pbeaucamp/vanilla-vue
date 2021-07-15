<template>
    <div align="center" v-if="this.kpi.data[0].result[0][0].maximum != 0">
    <vue-gauge 
        :refid="'type-unique-id'" 
        :options="{
            'needleValue': (this.kpi.data[0].result[0][0].value * 100 / (this.kpi.data[0].result[0][0].maximum)).toString(),
            'arcDelimiters':[this.kpi.data[0].result[0][0].objective * 100 / this.kpi.data[0].result[0][0].maximum], 
            'rangeLabel':[(this.kpi.data[0].result[0][0].minimum).toString(),(this.kpi.data[0].result[0][0].maximum).toString()],
            'arcColors': ['red','green'], 
            'arcOverEffect' : false, 
            'chartWidth':500, 
            'centralLabel':(this.kpi.data[0].result[0][0].value).toString()
            }">
    </vue-gauge>
    </div>
    <div align="center" v-else>
    <vue-gauge 
        :refid="'type-unique-id'" 
        :options="{
            'needleValue': (this.kpi.data[0].result[0][0].value).toString(),
            'arcDelimiters':[50], 
            'rangeLabel':[(this.kpi.data[0].result[0][0].minimum).toString(),'100'],
            'arcColors':['red','green'], 
            'arcOverEffect' : false, 
            'chartWidth':500, 
            'centralLabel':(this.kpi.data[0].result[0][0].value).toString()
            }">
    </vue-gauge>
    </div>
</template>
<script>
  import VueGauge from 'vue-gauge';
  import {mapState} from 'vuex';
  export default {
    components: { VueGauge },
    name: "Gauge",
    computed: {
        ...mapState(['kpi']),
        test(){
            return("f")
        }
    },
}
</script>
