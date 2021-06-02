<template>
    <div>        
    <v-data-table
    :headers="headers"
    :items="data"
    class="elevation-1"
    :hide-default-footer="data.length<10"
    >
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title class=" grey--text display-1 text-decoration-underline">{{title}}</v-toolbar-title>
        </v-toolbar>
    </template>

    <template v-slot:[`item.contain`]="{ item }"> 
            <v-icon color="success"  medium  v-if="item.contain.includes(user)"> mdi-checkbox-marked-circle-outline</v-icon>
            <v-icon color="error" medium v-else>mdi-circle-off-outline </v-icon>  
    </template>        

    <template class="text-center" v-slot:[`item.actions`]="{ item }"> <!-- v-slot:[`item.actions`]="{ item }" -->
        <v-btn icon :loading="loading_add_btns.includes(item.name)" @click="addUserTo(item.name)" v-if="!item.contain.includes(user)"> <!--  :id="`add-btn-${item.id}`" -->
            <v-icon color="success" medium > <!-- class="mr-2" -->
                mdi-account-plus
            </v-icon>
        </v-btn>
        <v-btn icon :loading="loading_remove_btns.includes(item.name)" :disabled='isRepo' @click="removeUserFrom(item.name)" v-else>
            <v-icon color="error" medium >
                mdi-account-minus
            </v-icon>  
        </v-btn>      
    </template>

    </v-data-table>



    </div>
</template>

<script>
export default {
    name: 'UserDatatable',
    props: {
        user : String,
        title : String,
        headers: Array,
        data: Array,
        dataType: {
            type: String,
            default: "group"
        },
    },
    data() {
        return {
            loading_add_btns: [],
            loading_remove_btns: [],
        }
    },

    computed: {
        isRepo: function() {
            return this.dataType === "repository";
        }
    },


    methods: {
        alertVar(mavar) {
            alert(mavar.name+" contain : "+mavar.contain + " mavar.contain.includes("+this.user+") :" + mavar.contain.includes(this.user));
        },

        addUserTo(name) {
            //var name = item.name;
            this.loading_add_btns.push(name);
            this.$store.dispatch('addUserTo', {
                "dataType": this.dataType,
                "userLogin":this.user,
                "name" : name
            })
            .then( response => {
                var indexOfName = this.loading_add_btns.indexOf(name); 
                if (indexOfName > -1) {
                    this.loading_add_btns.splice(indexOfName, 1);                 
                }
  
                this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: response, color: "success"});                
            })
            .catch( error => {       
                var indexOfName = this.loading_add_btns.indexOf(name); 
                if (indexOfName > -1) {
                    this.loading_add_btns.splice(indexOfName, 1);
                }       
                this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: error, color: "error"});                                
            });
        },

        removeUserFrom(name) {
            
            //var name = item.name;
            this.loading_remove_btns.push(name);
            this.$store.dispatch('removeUserFrom', {
                "dataType": this.dataType,
                "userLogin":this.user,
                "name" : name
            })
            .then( response => {
                var indexOfName = this.loading_remove_btns.indexOf(name); 
                if (indexOfName > -1) {
                    this.loading_remove_btns.splice(indexOfName, 1);                 
                }
                
                this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: response, color: "orange darken-2"});                      
            })
            .catch( error => {       
                var indexOfName = this.loading_remove_btns.indexOf(name); 
                if (indexOfName > -1) {
                    this.loading_remove_btns.splice(indexOfName, 1);
                }
                this.$store.dispatch('addSnackbar',{ id: 0,  aff: true, text: error, color: "error"});                      
            });
        },        


    },
}
</script>