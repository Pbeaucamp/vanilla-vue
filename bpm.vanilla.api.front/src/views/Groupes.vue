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
        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mt-2" @click="dialogAdd=true">
          Ajouter un groupe
        </v-btn>
      </v-toolbar>
    </template>


    <template class="text-center" v-slot:[`item.actions`]="{ item }">
      <v-btn text color="grey" :to="`/group/${item.name}`">
          <v-icon left >mdi-folder-cog</v-icon>
          <span>Configurer</span>
      </v-btn>          
    </template>

    </v-data-table>

    <v-row justify="center">
      <v-dialog v-model="dialogAdd" persistent max-width="600px">
            
        <v-form ref="form" v-model="valid" lazy-validation >  
        <v-card>
        <v-card-title>
            <h2 class="subheading grey--text">Ajouter un groupe</h2>
        </v-card-title>
        <v-card-text>
          <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="name" :rules="nameRules" label="Nom du groupe" required> </v-text-field>
            </v-col>
          </v-row>    
          </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" outlined class="mr-4" @click="reset">
              Annuler
            </v-btn>            
            <v-btn :disabled="!valid" :loading="loadingAddGroup" outlined color="success" class="mr-4" @click="validate">Confirmer</v-btn>
        </v-card-actions>
        </v-card>
        </v-form>
        </v-dialog>
      </v-row>


      
      
    </v-container>
  </div>

</template>


<script>
import {mapState} from 'vuex'

export default {
  name: 'Groupes',
  data() {
    return {
      name: "",
      dialogAdd: false,
      loadingAddGroup: false,
      valid: true,
      nameRules: [
        v => !!v || 'Le nom est requis',
      ],
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
  },
  methods: {
    createGroup() {
      this.loadingAddGroup = true;
      if ( this.name != "") {
        this.$store.dispatch("addGroup",this.name)
        .then(response => {
          var snackbar = { id: 0,  aff: true, text: response, color: "success"};
          this.$store.dispatch('addSnackbar',snackbar);
          this.loadingAddGroup = false;    
          this.dialogAdd = false;
          this.$refs.form.reset();
        })
        .catch( error => {
          this.loadingAddGroup = false;    
          this.dialogAdd = false;
          this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: error, color: "error"});
          this.$refs.form.reset();
        })
      }
    },


    validate () {
      if (this.$refs.form.validate()) {
        this.createGroup();
      }
    },
    reset () {
      this.$refs.form.reset();
      this.dialogAdd = false;
    },      
  }
}
</script>