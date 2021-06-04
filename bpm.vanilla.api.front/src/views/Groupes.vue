<template>
  <div class="groups">
    <h1 class="subheading grey--text">Groupes</h1>

      <v-container class="my-5">
      <v-data-table
      :headers="GroupHeaders"
      :items="groups.data"
      class="elevation-1"
      :hide-default-footer="groups.data.length<10"
      :footer-props="{
        'items-per-page-text':'Groupes par page',
        'page-text': '{0} à {1} sur {2}'
      }"
      >
      <template v-slot:top>
          <v-toolbar flat>
              <v-toolbar-title class=" grey--text display-1 text-decoration-underline">Liste des groupes</v-toolbar-title>
          </v-toolbar>
      </template>
  

      <template class="text-center" v-slot:[`item.actions`]="{ item }"> <!-- v-slot:[`item.actions`]="{ item }" -->
        <v-btn text color="grey" :to="`/group/${item.name}`">
            <v-icon left >mdi-folder-cog</v-icon>
            <span>Configurer</span>
        </v-btn>          
      </template>

      </v-data-table>
      
    </v-container>
  </div>

</template>


<script>
import {mapState} from 'vuex'

export default {
    name: 'Groupes',
    data() {
      return {
        GroupHeaders : [
          {
            text: 'Nom',
            align: 'start',
            value: 'name',
          },
          { text: 'Création', value: 'creation' },
          { text: "Nombre d'utilisateurs", value: 'contain.length',align: 'center', },    
          { text: '', value: 'actions', sortable: false , align: 'end'}                
        ]
      }
    }, 
    computed : {
      ...mapState(['groups'])      
    }
}
</script>