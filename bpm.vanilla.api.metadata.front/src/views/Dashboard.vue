<template>
  <div class="dashboard">
    <v-container class="my-5">
    <List/>



    <v-row wrap justify="center">

      <v-col cols="12" sm="12" md="4" lg="4" xl="4" v-if="affTreeview">
      <v-card
        class="mx-auto"
        max-width="500"
        :disabled="!tablesLoaded"
        :loading="tablesLoading"
      > 
        
        <v-sheet class="pa-4 primary lighten-1">
          <v-container class="pa-2" >
            <v-row >  
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
              <v-icon v-if="!item.file" >
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                {{ files[item.file] }}
              </v-icon>
            </template>
            
            <template v-slot:label="{ item }">
              <span class="indigo--text" v-if="item.type=='MEASURE'">{{item.name}}</span>
              <span class="green--text" v-else-if="item.type=='DIMENSION'">{{item.name}}</span>
              <span class="" v-else>{{item.name}}</span>
              <!--<span class="{ blue--text : item.type==='MEASURE'}" >{{item.name}}</span>-->
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





      <v-col cols="12" sm="12" :md="breakpointTreeview" :lg="breakpointTreeview" :xl="breakpointTreeview" >

        <v-card>
          <v-tabs
            v-model="tab"
            background-color="primary lighten-1"
            class=""
            dark
            icons-and-text
          >
            <v-tabs-slider></v-tabs-slider>
      
            <v-tab href="#query" >
              Requête
              <v-icon>mdi-database-settings</v-icon>
            </v-tab>
      
            <v-tab href="#results" :disabled="!(queryResult.length > 0)">
              Résultats
              <v-icon>mdi-clipboard-text-outline</v-icon>
            </v-tab>
      
            <v-tab href="#chart" :disabled="!(queryResult.length > 0)">
              Graphiques
              <v-icon>mdi-chart-box-plus-outline</v-icon>
            </v-tab>

            <!--
            <v-tab href="#relations" >
              Relations
              <v-icon>mdi-vector-polyline-plus</v-icon>
            </v-tab>
            -->

          </v-tabs>
      



          <v-speed-dial v-model="fab" top right direction="bottom" transition="scale-transition" class="mt-4" absolute>
            <template v-slot:activator>
              <v-btn v-model="fab" color="blue darken-2" dark fab>
                <v-icon v-if="fab">  mdi-close </v-icon>
                <v-icon v-else> mdi-database-edit </v-icon>
              </v-btn>
            </template>


            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click.stop="zoomOut" fab dark small v-bind="attrs" v-on="on" class="white--text" v-if="!(selectedColumns.length==0)" color="green darken-1" @click="dialogSaveQuery=true">
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </template>
              <span>Sauvegarder</span>
            </v-tooltip>    
        
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click.stop="zoomOut" fab dark small v-bind="attrs" v-on="on" class="white--text" v-if="!(packages.selected=='')" color="green darken-1" @click="getSaved" :loading="loadSaved">
                  <v-icon>mdi-cloud-download-outline</v-icon>
                </v-btn>
              </template>
              <span>Charger</span>
            </v-tooltip>  



            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click.stop="zoomOut" fab dark small v-bind="attrs" v-on="on" class="white--text" v-if="!(selectedColumns.length==0)" color="green lighten-1" @click="getSQL" :loading="loadSQL">
                  <v-icon>mdi-file-document-multiple-outline</v-icon>
                </v-btn>
              </template>
              <span>SQL</span>
            </v-tooltip>  

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click.stop="zoomOut" fab dark small v-bind="attrs" v-on="on" class="white--text" v-if="!(selectedColumns.length==0)" :loading="loadingQueryResult" color="primary darken-1" @click="executeQuery">
                  <v-icon>mdi-database-search</v-icon>
                </v-btn>
              </template>
              <span>Exécuter</span>
            </v-tooltip>  
              

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click.stop="zoomOut" fab dark small v-bind="attrs" v-on="on" class="white--text" color="orange lighten-1" @click="selectedColumns=[]">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Réinitialiser</span>
            </v-tooltip>  


            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn @click.stop="zoomOut" fab dark small v-bind="attrs" v-on="on"  v-if="!affTreeview" class="white--text" color="green darken-1" @click="affTreeview=true">
                  <v-icon>mdi-file-tree-outline</v-icon>
                </v-btn>
              </template>
              <span>Afficher les colonnes</span>
            </v-tooltip>                       

          </v-speed-dial>








          <v-tabs-items v-model="tab">

            
            <v-tab-item value="query">

              <v-data-table
              
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
              no-results-text="Aucun résultat." >
              <template v-slot:top> 

                <v-container>                   
                  <v-row >

                    <v-col class="mx-4" cols="12" sm="12" md="12" xl="5" ><h1 class="subheading grey--text">Création de requête</h1></v-col>
                    
                    <v-spacer></v-spacer>


                    <v-col>
                    <v-row class="">

                      
                      <v-col class="ml-1" > <v-checkbox v-model="queryDistinct" label="Distincte"></v-checkbox>     </v-col>     
                      <v-col class="mr-3" > <v-text-field v-model="queryLimit" label="Limite" type="number" class="ml-2" min="0"> </v-text-field>  </v-col>  
                      <v-col>

                      </v-col>

                    </v-row>  
                    </v-col>          

                  </v-row>

                </v-container>
                        
              </template>        

            </v-data-table>











            </v-tab-item>



            <v-tab-item value="results" >

              <!--v-if="(queryResult.length > 0) && affResult" -->
              <v-data-table
              flat
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
                  </v-row>
                </v-container>           
              </template>
              </v-data-table>

            </v-tab-item>




            <v-tab-item value="chart">
              <Chart :selectedColumns="selectedColumns" :affTreeview="affTreeview" />
            </v-tab-item>  

            <v-tab-item value="relations">
              Empty
            </v-tab-item>   

          </v-tabs-items>
  
        </v-card>


      </v-col>



    </v-row>

    <!--
    <v-row >
      <v-card v-if="(queryResult.length > 0)">
        <Chart :selectedColumns="selectedColumns" />
      </v-card>
    </v-row>
    -->

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
          <v-btn color="green" outlined class="mr-4" @click="copyQueryToClipboard"> Copier </v-btn>  
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
          <v-btn color="primary darken-1" outlined class="mr-4" @click="affSaved=false"> Fermer </v-btn>             
          <v-btn color="green darken-1" outlined class="mr-4" :loading="loadImportQuery" @click="getSavedQuery"> Importer </v-btn>   
        
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
import Chart from '../components/Chart.vue'

//import Sortable from 'sortablejs';

export default {

    name: 'Home',
    components: {List,Chart},
    data: () => ({
      tab: null,
      fab : false,
      affTreeview : true,
      loadImportQuery : false,
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
      ...mapState(["metadatas","models","packages","tables","queryResult","querySQL","savedQueries","loadedSavedQuery"]),
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
      breakpointTreeview() {
        return (this.affTreeview ? 8 : 12);
      }
    },
    methods : {
      ...mapActions(["getTables","getColumns","addNewSavedQuery","getQueryResult","getTablesAndColumns","getQuerySQL","getSavedQueries","getSavedQueryData"]),
      copyQueryToClipboard() {
        navigator.clipboard.writeText(this.querySQL);
      },
      getSavedQuery() {
        this.loadImportQuery = true;
        this.getSavedQueryData({metadataName : this.metadatas.selected ,modelName : this.models.selected ,packageName : this.packages.selected, queryName: this.selectedSavedQuery })
        .then(() => { 
          this.loadImportQuery = false;
          this.selectedColumns = []
          this.affSaved = false;
          this.queryDistinct = this.loadedSavedQuery.queryDistinct;
          this.queryLimit = this.loadedSavedQuery.queryLimit;
          for (const el of this.loadedSavedQuery.columns) {
            var tmpTab = el.split(":");
            var table = this.localTables.find(table => table.name == tmpTab[0]); 
            //console.log("tmpTab : " + tmpTab);
            //console.log(" tmpTab[0] : " +  tmpTab[0] + " | tmpTab[1] : " + tmpTab[1]);
            //console.log("table : " + JSON.stringify(table));
            //console.log("table children " + JSON.stringify(table.children));
            this.selectedColumns.push( table.children.find(col => col.name == tmpTab[1] ) );
            //console.log("psuhed children : " + JSON.stringify(table.children.find(col => col.name == tmpTab[1] )));
            /*
            this.selectedColumns.push (

              this.localTables.find(table => {
                table.name == tmpTab[0] && table.children.find(col => {col.name == tmpTab[1]})
              })
            );
            */
          }
          
        }).catch(() => {this.loadImportQuery = false;this.affSaved = false;});
      },
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
          this.tab="results";
          this.fab=false;
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
           repositoryID : this.$store.getters.repositoryID, groupID : this.$store.getters.groupID, metadataName : this.metadatas.selected ,modelName : this.models.selected ,packageName : this.packages.selected,
           columns : columns, queryName : this.queryName, queryDesc : this.queryDescription, queryLimit: this.queryLimit ,queryDistinct : this.queryDistinct
        }
        //console.log("My saved Query data : " + JSON.stringify(data));
        this.addNewSavedQuery(data).then( () => {this.loadingSaveQuery = false; this.dialogSaveQuery = false; }).catch( () => {this.loadingSaveQuery = false; this.dialogSaveQuery = false;});
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
      tab() {
        if(this.tab=="chart") {
          this.affTreeview = false;
        }
      },      
      packages : {
        handler : function () {
          if (this.packages.selected != "") {
            this.tablesLoading = true;
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
          this.tab="query";
        },
        deep : true
      },
      queryDistinct : {
        handler : function () {
          this.$store.commit('SET_QUERYRESULT', []);
          this.affResult = false;
          this.tab="query";
        }
      },
      queryLimit : {
        handler : function () {
          this.$store.commit('SET_QUERYRESULT', []);
          this.affResult = false;
          this.tab="query";
        }        
      },

    }

}
</script>

<style>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>