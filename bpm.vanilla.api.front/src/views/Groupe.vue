<template>
  <div class="repositories">
    <h1 class="subheading grey--text">{{$route.params.name}}</h1>


    <v-container class="my-5">


        <v-row wrap>


            <v-col xs="12" sm="12" md="4" lg="4">
                <v-card class=" ma-3">
                    <v-card-title class="grey--text display-1 text-decoration-underline">Informations</v-card-title>                                  
                    <v-card-text class="ma-3">  
                       <h4 class="title">Nom : {{group.name}}</h4>
                       <h4 class="title"  v-if="group.comment">Notes : {{group.comment}}</h4> 
                       <h4 class="title">Crée le : {{ affDate(group.creation)}}</h4>                   

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn outlined color="error" @click="dialogDelete=true">
                            <v-icon left >mdi-account-remove</v-icon>
                            <span>Supprimer</span>
                        </v-btn>                               
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col xs="12" sm="12" md="8" lg="8">
            <v-data-table
            :headers="headers"
            :items="users.data"
            class="elevation-1"
            :hide-default-footer="users.data.length<10"
            :search="search"
            :footer-props="{
                'items-per-page-text':'Utilisateurs par page',
                'page-text': '{0} à {1} sur {2}'
            }"
            no-results-text="Aucun résultat."
            >

                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title class=" grey--text display-1 text-decoration-underline">Liste des utilisateurs</v-toolbar-title>
                    </v-toolbar>
                    <v-text-field v-model="search" label="Rechercher un utilisateur" class="mx-4" append-icon="mdi-magnify"></v-text-field>
                </template>

                <template v-slot:[`item.id`]="{ item }"> 
                        <v-icon color="success"  medium  v-if="group.contain.includes(item.login)"> mdi-checkbox-marked-circle-outline</v-icon>
                        <v-icon color="error" medium v-else>mdi-circle-off-outline </v-icon>  
                </template>        

                <template class="text-center" v-slot:[`item.actions`]="{ item }"> 
                <v-btn icon :loading="loading_add_btns.includes(item.login)" @click="addUserTo(item.login)" v-if="!group.contain.includes(item.login)">
                    <v-icon color="success" medium > 
                        mdi-account-plus
                    </v-icon>
                </v-btn>
                <v-btn icon :loading="loading_remove_btns.includes(item.login)" @click="removeUserFrom(item.login)" v-else>
                    <v-icon color="error" medium >
                        mdi-account-minus
                    </v-icon>  
                </v-btn>  
                </template>

            </v-data-table>
            </v-col>

        </v-row>

        <v-dialog v-model="dialogDelete" persistent width="500">
          <v-card>
            <v-card-title class="text-center headline card-title">Êtes-vous sûr de vouloir supprimer le groupe {{group.name}} ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" outlined @click="dialogDelete=false">Annuler</v-btn>
              <v-btn color="error" outlined :loading="loading_remove_btns.includes(group.name)" @click="removeGroup">Oui</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-container>
  </div>

</template>


<script>
import { mapState } from 'vuex'

export default {
    name: 'Groupe',
    data() {
        return {
            search :'',
            dialogDelete: false,
            group : undefined,
            headers : [
                {
                    text: 'Login',
                    align: 'start',
                    value: 'login',
                },
                { text: 'Nom ', value: 'name' },
                { text: 'Crée le ', value: 'creation' },
                { text: "Appartient au groupe", value: 'id', align: 'center',
                    sort : (a, b) => {
                        var valA = this.group.contain.includes(this.$store.getters.users.find(el => el.id === a).login) ? 1 : -1;
                        var valB =  this.group.contain.includes(this.$store.getters.users.find(el => el.id === b).login) ? 1 : -1;                       
                        return (valA < valB) ? 1 : -1;
                    }                
                },    
                { text: '', value: 'actions', sortable: false }                
            ],
            loading_add_btns: [],
            loading_remove_btns: [],            
        }
    },
    computed: {
        ...mapState(['users', 'groups'])
    }, 
    beforeMount() {
        var group = this.groups.data.find( group => group.name === this.$route.params.name );
        if (group != undefined) {
            this.group = group;
            this.$store.dispatch("setBottomBtn", {visible: true, link: "/groups"});            
        } else {
            this.$router.push('/notfound');
        }
    }, 
    beforeRouteLeave (to, from, next) {
        this.$store.dispatch("setBottomBtn", {visible: false, link: ""});
        next();        
    },     
    methods: {
        affDate(date) {
            let tab = date.split("-");
            return tab[2]+"/"+tab[1]+"/"+tab[0];
        },
        addUserTo(login) {
            var groupName = this.group.name;
            this.loading_add_btns.push(login);
            this.$store.dispatch('addUserTo', {
                "dataType": "group",
                "userLogin": login,
                "name" : groupName
            })
            .then( response => {
                var indexOflogin = this.loading_add_btns.indexOf(login); 
                if (indexOflogin > -1) {
                    this.loading_add_btns.splice(indexOflogin, 1);                 
                }
  
                this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: response, color: "success"});                
            })
            .catch( error => {       
                var indexOflogin = this.loading_add_btns.indexOf(login); 
                if (indexOflogin > -1) {
                    this.loading_add_btns.splice(indexOflogin, 1);
                }       
                this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: error, color: "error"});                                
            });
        },

        removeUserFrom(login) {
            
            var groupName = this.group.name;
            this.loading_remove_btns.push(login);
            this.$store.dispatch('removeUserFrom', {
                "dataType": "group",
                "userLogin": login,
                "name" : groupName
            })
            .then( response => {
                var indexOflogin = this.loading_remove_btns.indexOf(login); 
                if (indexOflogin > -1) {
                    this.loading_remove_btns.splice(indexOflogin, 1);                 
                }
                
                this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: response, color: "orange darken-2"});                      
            })
            .catch( error => {       
                var indexOflogin = this.loading_add_btns.indexOf(login); 
                if (indexOflogin > -1) {
                    this.loading_remove_btns.splice(indexOflogin, 1);
                }
                this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: error, color: "error"});                      
            });
        },

        removeGroup() {
            this.loading_remove_btns.push(this.group.name);             
            this.$store.dispatch("removeGroup",this.group.name)
            .then(response => {
                this.dialogDelete = false;
                this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: response, color: "orange darken-2"});
                var indexOfName = this.loading_remove_btns.indexOf(this.group.name); 
                if (indexOfName > -1) {
                    this.loading_remove_btns.splice(indexOfName, 1);                 
                }
                
                this.$router.push('/groups');                                     
            }).catch((error) => {
                this.dialogDelete = false;
                var indexOfName = this.loading_remove_btns.indexOf(this.group.name); 
                if (indexOfName > -1) {
                    this.loading_remove_btns.splice(indexOfName, 1);                 
                } 
                this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: error, color: "error"});                               
            })
        }
    }
}
</script>

<style scoped>
.card-title {
    overflow-wrap: anywhere;
    word-wrap: break-word;
    word-break: normal;
    hyphens: auto;
}
</style>