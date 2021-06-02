<template>
  <div class="utilisateurs">
    <h1 class="subheading grey--text">{{$route.params.login}}</h1>

    <v-container class="my-5">


        <v-row wrap>

            <v-col xs="12" sm="12" md="4" lg="4" >
                <v-card class=" ma-3">
                    <v-card-title class="grey--text display-1 text-decoration-underline">Informations</v-card-title>                                  
                    <v-card-text class="ma-3">
                       <h4 class="title">Login : {{user.login}}</h4>    
                       <h4 class="title">Nom : {{user.name}}</h4>
                       <h4 class="title" v-if="user.businessMail != ''">Mail professionnel : {{user.businessMail}}</h4>  
                       <h4 class="title"  v-if="user.privateMail">Mail pesonnel : {{user.privateMail}}</h4> 
                       <h4 class="title">Crée le : {{ affDate(user.creation)}}</h4>                   

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
            
            <v-col xs="12" sm="12" md="4" lg="4" >
                <UserDatatable
                    title = "Groupes"
                    :user = "user.login"
                    :headers = "GroupHeaders"
                    :data ="this.$store.state.groups.data"
                />                
            </v-col>

            <v-col xs="12" sm="12" md="4" lg="4" >
                <UserDatatable
                    title = "Référentiels"
                    :user = "user.login"                        
                    :headers = "RepoHeaders"
                    :data ="this.$store.state.repositories.data"
                    dataType = "repository"
                />     
            </v-col>                        

        </v-row>

        <v-dialog v-model="dialogDelete" persistent width="500">
          <v-card>
            <v-card-title class="text-center headline card-title">Êtes-vous sûr de vouloir supprimer l'utilisateur {{user.login}} ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" outlined @click="dialogDelete=false">Annuler</v-btn>
              <v-btn color="error" outlined :loading="loading_remove_btns.includes(user.login)" @click="removeUser">Oui</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

    </v-container>
  </div>

</template>


<script>
import UserDatatable from '@/components/UserDatatable.vue'
export default {
    name: 'Utilisateur',
    components: {
      UserDatatable
    },    
    computed : {
      
    },
    data() {
        return {
            user: undefined,
            dialogDelete: false,  
            GroupHeaders : [
                {
                    text: 'Nom',
                    align: 'start',
                    value: 'name',
                },
                { text: 'Création', value: 'creation' },
                { text: 'Appartient à ', value: 'contain', align: 'center',
                    sort : (a, b) => {
                        var valA = a.includes(this.user.login) ? 1 : -1;
                        var valB = b.includes(this.user.login) ? 1 : -1;
                        return (valA < valB) ? 1 : -1;
                    }
                },
                { text: '', value: 'actions', sortable: false }                
            ],
            RepoHeaders : [
                {
                    text: 'Nom',
                    align: 'start',
                    value: 'name',
                },
                { text: 'Société', value: 'societe' },
                { text: 'Appartient à ', value: 'contain', align: 'center',
                    sort : (a, b) => {
                        var valA = a.includes(this.user.login) ? 1 : -1;
                        var valB = b.includes(this.user.login) ? 1 : -1;
                        return (valA < valB) ? 1 : -1;
                    }
                },
                { text: '', value: 'actions', sortable: false }
            ], 
            loading_remove_btns: [],
       
        }
    },    
    methods: {
        affDate(date) {
            let tab = date.split("-");
            return tab[2]+"/"+tab[1]+"/"+tab[0];
        },
        removeUser() {
            this.loading_remove_btns.push(this.user.login);            
            this.$store.dispatch("removeUser",this.user.login)
            .then(response => {
                this.dialogDelete = false;
                this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: response, color: "orange darken-2"});
                var indexOfName = this.loading_remove_btns.indexOf(this.user.login); 
                if (indexOfName > -1) {
                    this.loading_remove_btns.splice(indexOfName, 1);                 
                }
                
                this.$router.push('/users');                                     
            }).catch((error) => {
                this.dialogDelete = false;
                var indexOfName = this.loading_remove_btns.indexOf(this.user.login); 
                if (indexOfName > -1) {
                    this.loading_remove_btns.splice(indexOfName, 1);                 
                } 
                this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: error, color: "error"});                               
            })
        }

    },
    beforeMount() {
        this.$store.dispatch("setBottomBtn", {visible: true, link: "/users"});
        var user = this.$store.state.users.data.find( el => el.login ===  this.$route.params.login);
        if (user != undefined) {
            this.user = user;
            this.$store.dispatch("getUserGroups",this.user.login);
            this.$store.dispatch("getUserRepositories",this.user.login);
        } else {
            this.$router.push('/notfound');
        }

    },
    beforeRouteLeave (to, from, next) {
        this.$store.dispatch("setBottomBtn", {visible: false, link: ""});
        next();        
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