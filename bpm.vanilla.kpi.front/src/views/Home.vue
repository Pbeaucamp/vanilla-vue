<template>
  <v-app class="contenu">
    <v-layout>
      <v-col>
        <list />
        <v-row cols="2">
          <datatable />
          <v-col>
            <group-chart />
            <group-chart2 v-if="this.$store.state.boolniveau.data == true"/>
          </v-col>
        </v-row>
      </v-col>
    </v-layout>
  </v-app>
</template>

<script>
import Datatable from '../components/Datatable.vue'
import GroupChart from '../components/GroupChart.vue'
import GroupChart2 from '../components/GroupeChart2.vue'
import List from '../components/List.vue'

  export default {
    name: 'Home',

    components: {
        GroupChart,
        GroupChart2,
        Datatable,
        List
      },
  }
</script>
<style>
  .contenu {
    padding-bottom : 0px;
    margin-bottom : 0px
  }
  .layout{
    max-height: 50%;
  }
  .v-application--wrap {
    flex: 1 1 auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    min-height: 87vh;
    max-width: 100%;
    position: relative;
}
</style>