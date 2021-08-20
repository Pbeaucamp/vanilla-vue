<template>
        <v-card>
        <v-card-title class="indigo white--text display-1 text-decoration-underline">
        Repositories
        <v-spacer></v-spacer>
        <v-btn @click="reset()" class="mx-2">
          Recherche
        </v-btn>
        </v-card-title>
        
        <v-row
        class="pa-4"
        justify="space-between"
        >
        <v-col>      
            <v-sheet class="pa-4 indigo" v-if="research == 1">
              <v-text-field
                v-model="search"
                label="Rechercher un fichier"
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
                label="Recherche sensible a la casse"
              ></v-checkbox>
            </v-sheet>
            <v-treeview
            dense
            hoverable
            :items="this.ITEMdata()"
            :search="search"
            :filter="filter"
            :open.sync="open"
            open-on-click
            transition
            >
            <template v-slot:prepend="{ item }">
                <v-icon v-if="item.id == 'Rien'">
                mdi-cancel
                </v-icon>
                <v-icon v-else-if="item.type == 'DIRECTORY'">
                mdi-folder
                </v-icon>
                <v-icon v-else-if="item.type == 'FMDT'">
                mdi-dropbox
                </v-icon>
                <v-icon v-else-if="item.type == 'GED_ENTRY'">
                mdi-book-open
                </v-icon>
                <v-icon v-else-if="item.type == 'CUSTOM'">
                mdi-content-paste
                </v-icon>
                <v-icon v-else-if="item.type == 'FD'">
                mdi-table-cog
                </v-icon>
                <v-icon v-else-if="item.type == 'GTW'">
                mdi-database
                </v-icon>
                <v-icon v-else-if="item.type == 'BIW'">
                mdi-sync-circle
                </v-icon>
                <v-icon v-else-if="item.type == 'PORTAL'">
                mdi-door
                </v-icon>
                <v-icon v-else-if="item.type == 'FASD'">
                mdi-cube-outline
                </v-icon>
                <v-icon v-else-if="item.type == 'MAP'">
                mdi-map-legend
                </v-icon>
                <v-icon v-else-if="!item.children">
                mdi-file
                </v-icon>

            </template>
            <template slot="label" slot-scope="{ item }">
                <a @click="teste(item)">{{ item.name }}</a>
            </template>
            </v-treeview>
        </v-col>
        </v-row>
    </v-card>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
      ...mapState(['items']),
      ...mapState(['temps']),
      filter () {
        return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
      },
    },
    data: () => ({
      research : 0,
      open: [1, 2],
      search: null,
      caseSensitive: false,
    }),
    methods : {
        ITEMdata() {
            if (typeof this.items.data[0] == "object"){
            return this.items.data

            } else {
            return [
                {name : "Choisissez un groupe et un repository",
                id : "Rien"
            }]
            } 
        },
    
        teste(item) {
              var data
              console.log('ITEM ', item);
              console.log('A LEAF', item.name)
              console.log(item.type);
              console.log(this.temps.data);
              console.log(this.temps.data.repoName);
              console.log(this.temps.data.groupName);
              if (item.type == "DIRECTORY"){
                data = {
                  repoName : this.temps.data.repoName,
                  groupName : this.temps.data.groupName,
                  dirID : item
                }
                this.$store.dispatch('getItems', data)
              } else if (item.type == 'PORTAL'){
                window.open(
                    'https://semaphore-vanilla-kpi.data4citizen.com/#/portail/System/PAAT%20à%20destination%20des%20ARS',
                    '_blank' // <- This is what makes it open in a new window.
                  );
                } else if (item.type == 'FMDT'){
                window.open(
                    'https://semaphore-vanilla-metadata.data4citizen.com/portail/'+this.temps.data.groupName+'/'+item.name,
                    '_blank' // <- This is what makes it open in a new window.
                  );
                }
              else {
                console.log(item.id);

              }
              },
              reset(){
                if (this.research == 0){
                  var data
                  data = {
                  repoName : this.temps.data.repoName,
                  groupName : this.temps.data.groupName,
                }
                this.$store.dispatch('getAllItems', data)
                this.research = 1
                } else {
                  this.research = 0
                }
              },
        }
}
</script>

<style scoped>

</style>