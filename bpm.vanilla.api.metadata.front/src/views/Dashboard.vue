<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
    <List/>



    <v-row wrap>

      <v-col cols="12" sm="12" md="4" lg="4" xl="4" >
      <v-card
        class="mx-auto"
        max-width="500"
        :disabled="!tablesLoaded"
        :loading="tablesLoading"
      >
        <v-sheet class="pa-4 primary lighten-1">
          <v-text-field
            v-model="search"
            label="Rechercher une table ou une colonne"
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
            label="Recherche sensible à la casse"
          ></v-checkbox>
        </v-sheet>
        <v-card-text>
          <v-treeview
            v-model="selectedColumns"
            :items="localTables"
            item-key="id"
            return-object
            :search="search"
            :filter="filter"
            hoverable 
            open-on-click
            rounded
            selectable
            selected-color="primary"
            expand-icon=""
            on-icon="mdi-chevron-triple-left"
            off-icon="mdi-chevron-triple-right"
            indeterminate-icon="mdi-chevron-triple-right"
          >
            <!--
            activatable
            :active.sync="activeColumn"
            @update:active="mySuperAlert()"
            <template v-slot:prepend="{ item }">
              <v-icon
                v-if="item.children"
                v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
              ></v-icon>
            </template> -->

            
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="!item.file">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                {{ files[item.file] }}
              </v-icon>
            </template>
            
            <!--
            <template v-slot:label="{ item,selected }">
              <v-hover @click="selected=!selected" v-slot:default="{ hover }">
                <div>
                  <span>{{item.name}} | Selected : {{selected}}</span>
                  <v-icon v-if="hover && selected" class="primary right">mdi-chevron-triple-right</v-icon>
                </div>
              </v-hover>
            </template>      
            -->    

            
          </v-treeview>
        </v-card-text>
      </v-card>
      </v-col>


      <v-col cols="12" sm="12" md="8" lg="8" xl="8" >
        
        <v-card>
        
        <v-data-table
        flat
        v-if="(queryResult.length > 0) && affResult"          
        :headers="resultHeaders"
        :items="queryResult"
        class="elevation-1"
        :hide-default-footer="queryResult.length<10"
        :search="search"
        :footer-props="{
            'items-per-page-text':'Résultats par page',
            'page-text': '{0} à {1} sur {2}'
        }"
        no-results-text="Aucun résultat.">
        <template v-slot:top> 
          <v-container>
            <v-row class="ma-2">
            <h1 class="subheading grey--text">Résultats de la requête</h1>
            <v-spacer> </v-spacer>
            <v-btn class="white--text" v-if="affResult" color="primary lighten-1" @click="affResult=false" depressed > 
            <span class="mr-1"> Requête </span>
            <v-icon> mdi-database-settings </v-icon>
            </v-btn>
            </v-row>
          </v-container>           
        </template>
        </v-data-table>


        <v-data-table
          v-else
          flat
          :headers="headers"
          :items="selectedColumns"
          class="elevation-1"
          :hide-default-footer="selectedColumns.length<10"
          :search="search"
          :footer-props="{
              'items-per-page-text':'Colonnes par page',
              'page-text': '{0} à {1} sur {2}'
          }"
          no-results-text="Aucun résultat."
        >
          <template v-slot:top> 

          <v-container>                   
          <v-row v-if="!affResult">

          <v-col class="mx-4" md="2" xl="5" ><h1 class="subheading grey--text">Création de requête</h1></v-col>
          
          <v-spacer></v-spacer>


          <v-col md="9" xl="6" class="mt-3 text-right" >
            <v-row justify="end">
              <v-col class="pr-1 mx-1 pt-0 " md="3" xl="3"> 
                <v-btn class="white--text" v-if="(queryResult.length > 0) && !affResult" color="primary lighten-1" @click="affResult=true" depressed > 
                <span class="mr-1"> Résultats </span>
                <v-icon> mdi-clipboard-text-outline </v-icon>
                </v-btn> 
              </v-col>
              

              <v-col class="pr-1 mx-1 pt-0 " md="3" xl="3"> 
                <v-btn class="white--text" :loading="loadingQueryResult" color="primary darken-1" @click="executeQuery" depressed > 
                <span class="mr-1"> Exécuter </span>
                <v-icon> mdi-database-search </v-icon>
                </v-btn> 
              </v-col>

              <v-col class="pl-1 ml-1 mx-0 pt-0 "  md="4"  xl="4">  
                <v-btn class="white--text" color="green darken-1" @click="dialogSaveQuery=true" depressed >
                <span class="mr-1"> Sauvegarder </span>
                <v-icon> mdi-content-save </v-icon>
                </v-btn> 
              </v-col>
        
              <v-col class="pl-1 ml-1 mx-0 pt-0" md="" xl="2"> 
                <v-btn class="white--text px-2" color="green lighten-1" @click="getSQL" :loading="loadSQL" depressed > 
                <span class="mr-1">SQL</span>
                <v-icon> mdi-file-document-multiple-outline </v-icon>
                </v-btn> 
              </v-col>                   


              <v-col class="pl-0 ml-1 mx-0 pt-0" md="4" xl="3"> 
                <v-btn class="white--text px-2" color="orange lighten-1" @click="selectedColumns=[]" depressed > 
                <span class="mr-1">Réinitialiser</span>
                <v-icon> mdi-close-box-multiple-outline </v-icon>
                </v-btn> 
              </v-col> 

              <v-col class="pl-1 ml-1 mx-0 pt-0 "  md="4"  xl="3"> 
                <v-btn class="white--text px-2" color="green darken-1" @click="getSaved" :loading="loadSaved" depressed > 
                <span class="mr-1">Charger</span>
                <v-icon> mdi-cloud-download-outline </v-icon>
                </v-btn> 
              </v-col>

            </v-row>
          </v-col>

          <v-row class="">
            <!--
            <v-col class="mx-5"> 
              <v-btn class="white--text px-2" color="orange lighten-1" @click="selectedColumns=[]" depressed > 
              <span class="mr-1">Réinitialiser</span>
              <v-icon> mdi-close-box-multiple-outline </v-icon>
              </v-btn> 
            </v-col>         
            <v-col> 
              <v-btn class="white--text px-2" color="green lighten-1" @click="getSQL" :loading="loadSQL" depressed > 
              <span class="mr-1">SQL</span>
              <v-icon> mdi-file-document-multiple-outline </v-icon>
              </v-btn> 
            </v-col>      
            -->
              
            <v-col md=""><v-spacer></v-spacer></v-col>
            <v-col md=""><v-spacer></v-spacer></v-col>
            
            <v-col class="ml-1" > <v-checkbox v-model="queryDistinct" label="Distincte"></v-checkbox>     </v-col>     
            <v-col class="mr-3" > <v-text-field v-model="queryLimit" label="Limite" type="number" class="ml-2" > </v-text-field>  </v-col>  
          </v-row>            

          </v-row>
          </v-container>

                              
          </template>        
        <!--
        <template slot="items" slot-scope="props">
          <tr class="sortableRow" :key="itemKey(props.item)"> 
            <td class="px-1" style="width: 0.1%">
              <v-btn style="cursor: move" icon class="sortHandle"><v-icon>mdi-drag-horizontal-variant</v-icon></v-btn>
            </td>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.agg }}</td>
            <td class="text-xs-right">{{ props.item.pos }}</td>
          </tr>
        </template>     -->   
        </v-data-table>
        </v-card>
      </v-col>




    </v-row>

    <v-row justify="center">
    <v-dialog v-model="dialogSaveQuery" persistent max-width="600px">    

      <v-form ref="form" v-model="valid" lazy-validation >  
      <v-card>
      <v-card-title>
          <h2 class="subheading grey--text">Sauvegarder une requête</h2>
      </v-card-title>
      <v-card-text>
        <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="queryName" :rules="nameRules" label="Nom" required> </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="queryDescription" label="Description"> </v-text-field>    
          </v-col>
        </v-row>
        
        </v-container>
      </v-card-text>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" outlined class="mr-4" @click="reset">
            Annuler
          </v-btn>            
          <v-btn :disabled="!valid" :loading="loadingSaveQuery" outlined color="success" class="mr-4" @click="validate">Confirmer</v-btn>
      </v-card-actions>
      </v-card>
      </v-form>


    </v-dialog>
    </v-row> 

    <v-row justify="center">
    <v-dialog v-model="affSQL" persistent max-width="600px">    
      <v-card>
      <v-card-title>
          <h2 class="subheading grey--text">Requête SQL :</h2>
      </v-card-title>
      <v-card-text>
        {{querySQL}}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" outlined class="mr-4" @click="affSQL=false"> Fermer </v-btn>            
      </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>     

    <v-row justify="center">
    <v-dialog v-model="affSaved" persistent max-width="600px">    
      <v-card>
      <v-card-title>
          <h2 class="subheading grey--text">Requêtes sauvegardées :</h2>
      </v-card-title>
      <v-card-text>
      <v-select v-model="selectedSavedQuery" :items="savedQueries" label="Choisir une requête"  outlined class="mx-2"></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" outlined class="mr-4" @click="affSaved=false"> Charger </v-btn>   
        <v-btn color="primary darken-1" outlined class="mr-4" @click="affSaved=false"> Fermer </v-btn>            
      </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>       


    </v-container> 

  </div>
</template>

<script>
import { mapState, mapActions,mapGetters   } from 'vuex'

import List from '../components/List.vue'

//import Sortable from 'sortablejs';

export default {

    name: 'Dashboard',
    components: {List},
    data: () => ({
      selectedSavedQuery : "",
      affSaved : false,
      loadSaved : false,
      affSQL : false,
      loadSQL : false,
      loadingQueryResult : false,
      affResult : false,
      queryDistinct : false,
      queryLimit : 0,
      loadingSaveQuery: false,
      valid: true,
      nameRules: [ v => !!v || 'Le nom est requis',],
      dialogSaveQuery : false,
      queryName : "",
      queryDescription : "",
      itemKeys: new WeakMap(),
      currentItemKey: 0,
      localTables : [],
      headers : [
        {
          sortable: false
        },
        { text: 'Champ', align: 'start', value: 'name', sortable: false},
        { text: 'Aggrégation ', value: 'agg', sortable: false },
        { text: 'Position', value: 'pos', sortable: false },          
      ],
      activeColumn : [],
      selectedColumns : [],
      search :"",
      caseSensitive: false,
      files: {
        txt: 'mdi-file-document-outline',
      },
      tablesLoaded : false,
      tablesLoading : false,
    }),
    computed: {
      ...mapState(["metadatas","models","packages","tables","queryResult","querySQL","savedQueries"]),
      ...mapGetters(["repositoryName","groupName"]),
      filter () {
        return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
      },   
      items() {
        var files = [];
        return files;
      },
      resultHeaders() {
        if (this.queryResult != "") {
          //console.log("Query Result : " + JSON.stringify(this.queryResult));
          var headers = [];
          for (const el of this.selectedColumns) {
            headers.push( {text: el.name, value: el.parent+":"+el.name});
          }
          return headers;
        }
        return [];
      },
    },
    methods : {
      ...mapActions(["getTables","getColumns","addNewSavedQuery","getQueryResult","getTablesAndColumns","getQuerySQL","getSavedQueries"]),
      getSaved() {
        this.loadSaved= true;
        this.getSavedQueries({metadataName : this.metadatas.selected ,modelName : this.models.selected ,packageName : this.packages.selected}).then(() => { this.loadSaved= false; this.affSaved = true; }).catch( () => { this.loadSaved= false;});
      },
      getSQL() {
        this.loadSQL = true; 
        var columns = "";
        for (const el of this.selectedColumns) {
          columns += el.parent+":"+el.name+","
        }
         var data = {
          metadataName : this.metadatas.selected ,modelName : this.models.selected ,packageName : this.packages.selected,
          columns : columns, queryName : this.queryName, queryDescription : this.queryDescription, queryLimit: this.queryLimit ,queryDistinct : this.queryDistinct
        }        
        this.getQuerySQL(data).then( () => {
          this.loadSQL=false; 
          this.affSQL = true;
        }).catch( () => {
          this.loadSQL=false;
        });
      },
      executeQuery() {
        this.loadingQueryResult = true;
        var columns = "";
        for (const el of this.selectedColumns) {
          columns += el.parent+":"+el.name+","
        }
         var data = {
          metadataName : this.metadatas.selected ,modelName : this.models.selected ,packageName : this.packages.selected,
          columns : columns, queryName : this.queryName, queryDescription : this.queryDescription, queryLimit: this.queryLimit ,queryDistinct : this.queryDistinct
        }
        this.getQueryResult(data).then( () => {
          this.loadingQueryResult=false; 
          this.affResult = true;
        }).catch( () => {
          this.loadingQueryResult=false;
        });

      },
      validate () {
        if (this.$refs.form.validate() && (this.selectedColumns.length > 0) ) {
          this.saveQuery();
        }
      },
      reset () {
        this.$refs.form.reset();
        this.dialogSaveQuery = false;
      },           

      saveQuery() {
        this.loadingSaveQuery = true;
        var columns = "";
        for (const el of this.selectedColumns) {
          columns += el.parent+":"+el.name+","
        }
        columns = columns.slice(0,-1);
        var data = {
           repositoryName : this.repositoryName, groupName : this.groupName, metadataName : this.metadatas.selected ,modelName : this.models.selected ,packageName : this.packages.selected,
           columns : columns, queryName : this.queryName, queryDescription : this.queryDescription, queryLimit: this.queryLimit ,queryDistinct : this.queryDistinct
        }
        //console.log("My saved Query data : " + JSON.stringify(data));
        this.addNewSavedQuery(data).then( () => {this.loadingSaveQuery = false}).catch( () => {this.loadingSaveQuery = false});
      },
      mySuperAlert() {
        alert(this.activeColumn)
      },
      addColumn() {
        if (this.selectedColumns.find(el => el.name == this.activeColumn[0]) == undefined) {
          this.selectedColumns.push({name :  this.activeColumn[0]});
        }
      }, 
      removeColumn() {
        var a = this.selectedColumns.find(el => el.name == this.activeColumn[0]);
        if (a != undefined) {
          this.selectedColumns.splice(this.selectedColumns.indexOf(a),1);
        }
      }, 
      /*
      dragReorder ({oldIndex, newIndex}) {
        const movedItem = this.items.splice(oldIndex, 1)[0]
        this.items.splice(newIndex, 0, movedItem)
      },
      itemKey (item) {
        if (!this.itemKeys.has(item)) this.itemKeys.set(item, ++this.currentItemKey)
        return this.itemKeys.get(item)
      }    */
    }, 
    /*
    mounted () {
      new Sortable(
        this.$refs.sortableTable.$el.getElementsByTagName('tbody')[0],
        {
          draggable: '.sortableRow',
          handle: '.sortHandle',
          onEnd: this.dragReorder
        }
      )
    },    
    
    */
    watch: {
      packages : {
        handler : function () {
          if (this.packages.selected != "") {
            this.tablesLoading = true;

            /*
            this.getTables( {metadataName : this.metadatas.selected ,modelName : this.models.selected ,packageName : this.packages.selected})
            .then( () => {
              var promiseArray = [];
              this.tables.data.forEach(element => {
                promiseArray.push(
                  this.getColumns({metadataName : this.metadatas.selected ,modelName : this.models.selected ,packageName : this.packages.selected, tableName : element.name})
                );
              });
              Promise.all(promiseArray).then( () => {
                
                this.tablesLoaded = true;
                this.tablesLoading = false;
                this.localTables = this.tables.data;
                this.localTables.forEach(e => {
                  e.children.forEach(child => {child["agg"] ="NONE"; child["pos"] = 0;})
                })
              })
              
            }) 
            */

            this.getTablesAndColumns({metadataName : this.metadatas.selected ,modelName : this.models.selected ,packageName : this.packages.selected})
            .then( () => {
              this.tablesLoaded = true;
              this.tablesLoading = false;
              this.localTables = this.tables.data;
            })

          } else {
            this.tablesLoaded = false;
          }



        },
        deep: true        
      },
      selectedColumns : {
        handler : function () {
          for (let i = 0 ; i < this.selectedColumns.length; i++) {
            this.selectedColumns[i].pos = i+1;
          }
          this.$store.commit('SET_QUERYRESULT', []);
          this.affResult = false;
        },
        deep : true
      },
      queryDistinct : {
        handler : function () {
          this.$store.commit('SET_QUERYRESULT', []);
          this.affResult = false;
        }
      }

    }

}
</script>

<style>

</style>