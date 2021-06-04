<template>
  <div class="repositories">
    <h1 class="subheading grey--text">Référentiels</h1>

      <v-container class="my-5">

        <v-data-table
        :headers="RepoHeaders"
        :items="repositories.data"
        class="elevation-1"
        :hide-default-footer="repositories.data.length<10"
        :footer-props="{
          'items-per-page-text':'Référentiels par page',
          'page-text': '{0} à {1} sur {2}'
        }"
        >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title class=" grey--text display-1 text-decoration-underline">Liste des référentiels</v-toolbar-title>
            </v-toolbar>
        </template>
    

        <template class="text-center" v-slot:[`item.actions`]="{ item }">
          <v-btn text color="grey" :to="`/repository/${item.name}`">
              <v-icon left >mdi-message-cog</v-icon>
              <span>Configurer</span>
          </v-btn>          
        </template>

        </v-data-table>


    </v-container>
  </div>

</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'Référentiels',
  data() {
    return {
      RepoHeaders : [
        {
            text: 'Nom',
            align: 'start',
            value: 'name',
        },
        { text: 'Société', value: 'societe' },
        { text: "Nombre d'utilisateurs", value: 'contain.length',align: 'center', },        
        { text: '', value: 'actions', sortable: false , align: 'end'}
      ], 
  
    }
  }, 
  computed: {
    ...mapState(['repositories'])
  }

}
</script>