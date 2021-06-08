<template>
  <div class="utilisateurs">
    <h1 class="subheading grey--text">Utilisateurs</h1>

    <v-container class="my-5">

        <v-row row wrap>        
            <v-col xs="12" sm="12" md="12" lg="12">
                
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

                        <v-spacer></v-spacer>

                        <v-btn color="primary" dark class="mt-2" @click="dialogAdd=true">
                            Ajouter un utilisateur 
                        </v-btn>                        
                    </v-toolbar>
                    <v-text-field v-model="search" label="Rechercher un utilisateur" class="mx-4" append-icon="mdi-magnify"></v-text-field>                    
                </template>

               
                <template class="text-center" v-slot:[`item.actions`]="{ item }"> 
                    <v-btn text color="grey" :to="`/user/${item.login}`">
                        <v-icon left >mdi-account-cog</v-icon>
                        <span>Configurer</span>
                    </v-btn>       
                </template>

                </v-data-table>
               

            </v-col>
        </v-row>              



        <v-row justify="center">
        <v-dialog
            v-model="dialogAdd"
            persistent
            max-width="600px"
        >
            
            <v-form ref="form" v-model="valid" lazy-validation >  
            <v-card>
            <v-card-title>
                <h2 class="subheading grey--text">Ajouter un utilisateur</h2>
            </v-card-title>
            <v-card-text>
                <v-container>
                <v-row>
              
                    <v-col cols="12">
                        <v-text-field v-model="name" :rules="nameRules" label="Nom" required> </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="login" :rules="loginRules" label="Login" required> </v-text-field>    
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="password" :rules="passwordRules" label="Mot de passe" required :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"> </v-text-field>       
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="email" :rules="emailRules" label="Email" required> </v-text-field>    
                    </v-col>

                </v-row>
                
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined class="mr-4" @click="reset">
                    Annuler
                </v-btn>            
                <v-btn :disabled="!valid" :loading="loadingAddUser" outlined color="success" class="mr-4" @click="validate">Confirmer</v-btn>
            </v-card-actions>
            </v-card>
            </v-form>
        </v-dialog>
        </v-row>






    </v-container>
  </div>

</template>


<script>
import { mapState } from 'vuex'

export default {
    name: 'Utilisateurs',
    data() {
        return {
            search : '',
            loadingAddUser: false,
            dialogAdd: false,
            showPassword: false,
            absoluteOverlay: true,
            headers : [
                {
                    text: 'Login',
                    align: 'start',
                    value: 'login',
                },
                { text: 'Nom ', value: 'name' },
                { text: 'Crée le ', value: 'creation' , align:'center'},
                { text: '', value: 'actions', sortable: false, align:'end' }                
            ],            
            valid: true,
            name: '',
            login: '',
            password: '',
            nameRules: [
                v => !!v || 'Le nom est requis',
            ],
            loginRules: [
                v => !!v || 'Le login est requis',
                v => (v && (this.$store.getters.users.find(user => user.login.toLowerCase() === v.toLowerCase()) === undefined) ) || 'Cet utilisateur existe déjà',
            ],
            passwordRules: [
                v => !!v || 'Le mot de passe est requis',
            ],
            email: '',
            emailRules: [
                v => !!v || "L'e-mail est requis",
                v => /.+@.+\..+/.test(v) || "L'e-mail doit être valide",
            ],                

            }
    }, 
    computed: {
        ...mapState(['users','groups','repositories'])
    },
    methods: {

        createUser() {
            this.loadingAddUser = true;
            if ( this.name != "" && this.login != "" && this.password != "" && this.email != "") {
                var login = this.login;         
                var data ={
                    name: this.name,
                    login: login,
                    password: this.password,
                    mail: this.email,
                };
                this.$store.dispatch('addUser',data)
                .then(response => {
                    var snackbar = { id: 0,  aff: true, text: response, color: "success"};
                    this.$store.dispatch('addSnackbar',snackbar);
                    this.loadingAddUser = false;    
                    this.dialogAdd = false;
                    this.$refs.form.reset();
                })
                .catch( error => {
                    this.loadingAddUser = false;    
                    this.dialogAdd = false;
                    this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: error, color: "error"});
                    this.$refs.form.reset();
                })
            }
        },

        validate () {
            if (this.$refs.form.validate()) {
                this.createUser();
                
            }
        },
        reset () {
            this.$refs.form.reset();
            this.dialogAdd = false;
        },      
    }

}
</script>