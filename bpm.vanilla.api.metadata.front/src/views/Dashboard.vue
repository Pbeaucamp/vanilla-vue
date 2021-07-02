<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
    <List/>

    <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-sheet class="pa-4 primary lighten-2">
        <v-text-field
          v-model="search"
          label="Rechercher une table ou une colonne"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
        <v-checkbox
          v-model="caseSensitive"
          dark
          hide-details
          label="Recherche sensible à la casse"
        ></v-checkbox>
      </v-sheet>
      <v-card-text>
        <v-treeview
          :items="tables.data"
          :search="search"
          :filter="filter"
          open-on-click
        >
          <!--
          <template v-slot:prepend="{ item }">
            <v-icon
              v-if="item.children"
              v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
            ></v-icon>
          </template> -->

          
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="!item.file">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.file] }}
            </v-icon>
          </template>

          
        </v-treeview>
      </v-card-text>
    </v-card>



    </v-container>    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import List from '../components/List.vue'

export default {
    name: 'Dashboard',
    components: {List},
    data: () => ({
      initiallyOpen: ['public'],
      search :"",
      caseSensitive: false,
      files: {
        txt: 'mdi-file-document-outline',
      },
    }),
    computed: {
      ...mapState(["metadatas","models","packages","tables"]),
      filter () {
        return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
      },      
      items() {
        var files = [];

        return files;
      }
    },
    methods : {
      ...mapActions(["getTables","getColumns"]),
    },
    watch: {
      packages : {
        handler : function () {
          console.log("this.packages.selected : " + this.packages.selected);
          if (this.packages.selected != "") {
            this.getTables( {metadataName : this.metadatas.selected ,modelName : this.models.selected ,packageName : this.packages.selected})
            .then( () => {
              this.tables.data.forEach(element => {
                console.log("Table : "  + element.name);
                this.getColumns({metadataName : this.metadatas.selected ,modelName : this.models.selected ,packageName : this.packages.selected, tableName : element.name})
                .then( () => {
                  console.log("New element : "  + JSON.stringify(element) );
                });
              });
            })
          }

        },
        deep: true        
      }
    }

}
</script>

<style>

</style>