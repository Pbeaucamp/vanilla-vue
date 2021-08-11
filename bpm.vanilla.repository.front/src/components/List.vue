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
          v-model="repository"
          :items="this.RepositoriesData"
          label="Repositories"
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
      repository : ""
    }),
    computed: {
        ...mapState(['groups']),
        ...mapState(['repositories']),
        GroupsData() {
            var nomGr = [];
            this.groups.data.forEach(element => {
                nomGr.push(element.name)
            });
            if (this.repository != ""){
                var data = {
                    repoName : this.repository,
                    groupName : this.group
                }
                this.$store.dispatch('getItemsRoot', data)
                this.$store.dispatch('getTemps',data)
            }
            return nomGr;
            },
        RepositoriesData() {
            var nomRe = [];
            this.repositories.data.forEach(element => {
                nomRe.push(element.name)
            });
            if (this.group != ""){
                var data = {
                    repoName : this.repository,
                    groupName : this.group
                }
                this.$store.dispatch('getItemsRoot', data)
                this.$store.dispatch('getTemps',data)
            }
            return nomRe;
            }
        },
  }
</script>
<style scoped>
  .d-flex {
    padding-bottom : 0px;
    margin-bottom : 0px
  }
</style>