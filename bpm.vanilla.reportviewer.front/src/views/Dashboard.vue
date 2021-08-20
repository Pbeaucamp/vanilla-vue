<template>
  <div class="dashboard">
    <v-container class="my-5">








      <v-row align="center" justify="center">
        <v-col xs="12" sm="6" md="6" lg="6">
          <v-card class="mx-auto" max-width="500">    
            <v-sheet class="pa-4 primary lighten-1">
              <v-container class="pa-2" >
                <v-row >  
                <v-text-field
                  v-model="search"
                  label="Rechercher un rapport"
                  dark
                  flat
                  solo-inverted
                  hide-details
                  clearable
                  clear-icon="mdi-close-circle-outline"
                ></v-text-field>
                </v-row>
                <v-row>
                <v-checkbox
                  v-model="caseSensitive"
                  dark
                  hide-details
                  label="Recherche sensible à la casse"
                ></v-checkbox>
                <v-spacer></v-spacer>
                <v-btn icon text class="mt-3 white--text" @click="affTreeview=false"> <v-icon >mdi-format-horizontal-align-left</v-icon> </v-btn>

                </v-row>
              </v-container>
            </v-sheet>
            <v-card-text>
              <v-treeview v-model="selectedReport" :items="reports" item-key="id" return-object
                :search="search"
                :filter="filter"
                hoverable 
                open-on-click
                rounded
                activatable
                selected-color="primary">

                
                <template v-slot:prepend="{ }">
                  <v-icon >
                    mdi-content-paste
                  </v-icon>
                </template>
                
                <template v-slot:label="{ item }">
                  <span>{{item.name}}</span>
                </template>   


                
              </v-treeview>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>        
       

    </v-container>    
  </div>
</template>

<script>
import {mapState} from 'vuex'


export default {
    name: 'Dashboard',
    components: {  },
    data: () => ({
        caseSensitive : false,
        selectedReport: [],
        search : "",
    }),

    computed: {
      ...mapState(["reports"]),
      filter () {
        return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
      },   
    },

}
</script>

<style>

</style>