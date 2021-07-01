<template>
      <v-col
        class="d-flex"
      >
      <v-layout>
        <v-select
          v-model="group"
          :items="this.GroupsData"
          label="Groupes"
          outlined
          class="mx-2"
        ></v-select>
        <v-select
          :disabled="group == ''"
          v-model="observ"
          :items="this.ObservData"
          label="Observatoires"
          outlined
        class="mx-2"
        ></v-select>
        <v-select
          :disabled="group == ''"
          v-model="theme"
          :items="this.ThemeData"
          label="Thèmes"
          outlined
          class="mx-2"
        ></v-select>
        </v-layout>
      </v-col>

</template>
<script>
import {mapState} from 'vuex'

  export default {
    data: () => ({
      items: [],
      group: "",
      observ: "",
      theme: "",
    }),
    computed: {
        ...mapState(['groups']),
        ...mapState(['observatories']),
        ...mapState(['themes']),
        
        GroupsData() {
            var nomGr = [];
            this.groups.data.forEach(element => {
                nomGr.push(element.name)
            });
            if (this.group != ""){
              this.$store.dispatch('getObservatories',this.group)
              this.$store.dispatch('getTheme',this.group)
            }
            return nomGr;
        },
        ObservData() {
            var nomOb = [];
            this.observatories.data.forEach(element => {
                nomOb.push(element.name)
            });
            if (this.observ != ""){
              this.$store.dispatch('getThemeByObs',this.observ)
            }
            return nomOb;
        },
        ThemeData() {
            var nomTh = [];
            this.themes.data.forEach(element => {
                nomTh.push(element.name)
            });
            if ((this.group != "") & (this.theme != "")){
              var data = {
                group : this.group,
                theme : this.theme,
                themes : this.themes.data
              }
              this.$store.dispatch('tempData', data)
              this.$store.dispatch('getKPI', data)
            }
            return nomTh;
        },
    },
  }
</script>
<style scoped>
  .d-flex {
    padding-bottom : 0px;
    margin-bottom : 0px
  }
</style>