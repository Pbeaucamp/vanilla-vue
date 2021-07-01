<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">

        
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg4 v-for="item in apiData" :key="item.name">
                <v-card  class="text-center ma-3">
                    <v-responsive class="pt-4">
                        <v-avatar size="100" class="grey lighten-2">
                            <v-img src="@/assets/icon_vanilla.png">
                            <v-icon class="white--text" large>{{item.icon}}</v-icon>
                            </v-img>
                        </v-avatar>
                    </v-responsive>
                    <v-card-text>
                        <h4 class="display-1">{{item.name}}</h4>
                        <div class="grey--text">{{item.data.length}} {{item.name.replace(/.$/,"(s)").toLowerCase()}} </div>     
                    </v-card-text>
                    <v-card-actions >
                        <v-spacer></v-spacer>
                        <v-btn text color="grey" :to="item.path">
                            <v-icon left >mdi-message-bulleted</v-icon>
                            <span>Détails</span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>


        <v-row align="center" justify="center">
            <v-col xs="12" sm="6" md="6" lg="6">
                <v-card class="text-center ma-3">
                    <v-card-text>
                        <h4 class="display-1 grey--text">Nombre d'utilisateurs par groupes</h4>
                        <GroupChart/>                   
                    </v-card-text>
                </v-card>            
            </v-col>
        </v-row>        
        <v-row align="center" justify="center">
            <v-col xs="12" sm="12" md="12" lg="12">
                <v-card class="text-center ma-3">
                    <v-card-text>
                        <h4 class="display-1 grey--text">Groupes et sous groupes</h4>
                        <OrganizationChart/>                   
                    </v-card-text>
                </v-card>            
            </v-col>
        </v-row>  

    </v-container>    
  </div>
</template>

<script>
import {mapState} from 'vuex'
import GroupChart from '@/components/GroupChart'
import OrganizationChart from '@/components/OrganizationChart'

export default {
    name: 'Dashboard',
    components: { GroupChart, OrganizationChart  },
    computed: {
        ...mapState({
            apiData (state) {
                return [state.users, state.groups, state.repositories];
            }
        }),
    },

}
</script>

<style>

</style>