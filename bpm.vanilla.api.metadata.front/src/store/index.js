import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import config from '../config.json'


axios.defaults.baseURL=config.baseURL;
axios.defaults.headers.common['X-Gravitee-Api-Key'] = "f3510842-ef9b-4ee7-8877-4d59b5d63907";
//X-Gravitee-Api-Key

//console.log("Config baseURL = "+config.baseURL);

//console.log("Axios default = "+ JSON.stringify(axios.defaults));

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    querySQL : "",
    queryResult : [],
    repositories : {
      name : "Référentiels",
      data : [],
      selected : "",
    },
    repositoryName : "",
    groups : {
      name : "Groupes",
      data : [],
      selected : "",
    },
    groupName : "",
    metadatas : {
      name : "Metadatas",
      data : [],
      selected : "",
    },
    models : {
      name : "Business Models",
      data : [],
      selected : "",
    },
    packages : {
      name : "Business Packages",
      data : [],
      selected : "",
    },
    tables : {
      name : "Business Tables ",
      data : [],
      columns : [],
      selected : "",
      idCount : 0,
    },
    snackbars: {
      id: 0,
      data : []
    },
    bottom_redirect_btn : {
      visible : false,
      link : '',
    }
  },
  mutations: {
    ADD_SNACKBAR(state, snackbar) {
      state.snackbars.data.push(snackbar);
    },
    REMOVE_SNACKBAR(state, indexOfsnackbar) {
      state.snackbars.data.splice(indexOfsnackbar,1);  
    },
    SET_BOTTOM_REDIRECT_BTN(state, btn) {
      state.bottom_redirect_btn = btn;
    },
    SET_REPOSITORYNAME(state,name) {
      state.repositoryName = name;
    },
    SET_GROUPS(state, groups) {
      state.groups.data = groups;
    },
    SET_METADATAS(state,metadatas) {
      state.metadatas.data = metadatas;
    },
    SET_MODELS(state,models) {
      state.models.data = models;
    },
    SET_PACKAGES(state,packages) {
      state.packages.data = packages;
    },
    SET_TABLES(state, tables) {
      state.tables.data = tables;
    },
    SELECT_REPOSITORY(state,name) {
      state.repositories.selected = name;
    },
    SELECT_GROUP(state, name) {
      state.groups.selected = name;
    },
    SELECT_METADATA(state, name) {
       state.metadatas.selected = name;
    },
    SELECT_MODEL(state, name) {
      state.models.selected = name;
    },
    SELECT_PACKAGE(state, name) {
      state.packages.selected = name;
    },
    INC_ID(state) {
      state.tables.idCount++;
    },
    SET_QUERYRESULT(state, result) {
      state.queryResult = result;
    },
    SET_QUERYSQL(state,sql) {
      state.querySQL = sql;
    }

  },
  actions: {
    setBottomBtn({commit}, btn) {
      commit("SET_BOTTOM_REDIRECT_BTN", btn);
    },
    clickBottomBtn({commit,state}) {
      if ( state.bottom_redirect_btn.link != '') {
        router.push(state.bottom_redirect_btn.link);
        commit("SET_BOTTOM_REDIRECT_BTN", {visible: false, link: ''});
      }
    },
    addSnackbar({state,commit, dispatch},snackbar) {
      snackbar.id = state.snackbars.id;
      state.snackbars.id++;

      commit("ADD_SNACKBAR",snackbar);
      setTimeout( function(dispatch) {dispatch('removeSnackbar',snackbar)}, 5000, dispatch); // Le timeout est de 5s, au bout de 5sc on retire le snackbar de la list
    },
    removeSnackbar({state,commit},snackbar) {
      var indexOfSnackbar = state.snackbars.data.indexOf(snackbar);
      if (indexOfSnackbar != -1) {
        commit("REMOVE_SNACKBAR",indexOfSnackbar);
      }   
    },

    getGroups({commit}) {
      return new Promise( (resolve, reject) => {
        axios.get("/groups")
        .then(response => {
          if (response.data.status == "success") {
            var groups = [];
            response.data.result.forEach(el => groups.push(el.name));
            commit("SET_GROUPS", groups);
          }
          resolve();
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve groups message : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve groups : " + error);
          }
          reject(error);
        })

      });
    },


    getMetadata({commit,getters,dispatch}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/metadatas`, { params : { repositoryName : getters.repositoryName, groupName : getters.groupName} })
        .then(response => {
          if (response.data.status == "success") {
            commit("SET_METADATAS", response.data.result);
          }
          resolve();
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve metadatas message : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve metadatas : " + error);
          }
          dispatch("addSnackbar", { id: 0,  aff: true, text: "Erreur lors de la récupération des Metadatas.", color: "error"});
          reject(error);
        })
      })
    },

    getBusinessModels({commit,getters,dispatch} , metadataName) {
      return new Promise( (resolve, reject) => {
        axios.get(`/models`,{ params : { repositoryName : getters.repositoryName, groupName : getters.groupName, metadataName : metadataName } })
        .then(response => {
          if (response.data.status == "success") {
            commit("SET_MODELS", response.data.result);
          }
          resolve();
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve models message : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve models : " + error);
          }
          dispatch("addSnackbar", { id: 0,  aff: true, text: "Erreur lors de la récupération des Business Models.", color: "error"});
          reject(error);
        })
      })
    },

    getBusinessPackages({commit,getters,dispatch} , {metadataName,modelName}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/packages`,{ params : { repositoryName : getters.repositoryName, groupName : getters.groupName, metadataName : metadataName, modelName : modelName } })
        .then(response => {
          if (response.data.status == "success") {
            commit("SET_PACKAGES", response.data.result);
          }
          resolve();
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve packages message : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve packages : " + error);
          }
          dispatch("addSnackbar", { id: 0,  aff: true, text: "Erreur lors de la récupération des Business Packages.", color: "error"});
          reject(error);
        })
      })
    },

    getTablesAndColumns({dispatch,getters,commit}, {metadataName,modelName,packageName}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/tables/columns`,{ params : { repositoryName : getters.repositoryName, groupName : getters.groupName, metadataName : metadataName, modelName : modelName, packageName : packageName } })
        .then(response => {
          if (response.data.status == "success") {
            var tables = []
            response.data.result.forEach(element => {
     
              dispatch("getTableNewID").then( id => {
                var children = [];
                for (const el of element[Object.keys(element)[0]]) {

                  dispatch("getTableNewID").then( newID => { 
                    children.push({id: newID,name : el , parent : Object.keys(element)[0]+"", agg : "NONE", pos : 0,  file : "txt" });
                  });       
                }
                tables.push({id: id,name : Object.keys(element)[0], children : children})
              });
            });
            commit("SET_TABLES", tables);
          }
          resolve();
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve tables message : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve tables : " + error);
          }
          dispatch("addSnackbar", { id: 0,  aff: true, text: "Erreur lors de la récupération des Tables.", color: "error"});
          reject(error);
        })
      });
    },


    getTables({commit,getters,dispatch} , {metadataName,modelName,packageName}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/tables`,{ params : { repositoryName : getters.repositoryName, groupName : getters.groupName, metadataName : metadataName, modelName : modelName, packageName : packageName } })
        .then(response => {
          if (response.data.status == "success") {
            var tables = []
            response.data.result.forEach(element => {
              dispatch("getTableNewID").then( id => {
                tables.push({id: id,name : element, children : []})
              });
            });
            commit("SET_TABLES", tables);
          }
          resolve();
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve tables message : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve tables : " + error);
          }
          dispatch("addSnackbar", { id: 0,  aff: true, text: "Erreur lors de la récupération des Tables.", color: "error"});
          reject(error);
        })
      })
    },

    getColumns({commit,getters,dispatch} , {metadataName,modelName,packageName,tableName}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/columns`,{ params : { repositoryName : getters.repositoryName, groupName : getters.groupName, metadataName : metadataName, modelName : modelName, packageName : packageName, tableName : tableName } })
        .then(response => {
          if (response.data.status == "success") {
            //var result = [];
            var tables = getters.tables;
            var table = tables.find(table => table.name == tableName);
            
            response.data.result.forEach(element => {
              dispatch("getTableNewID").then( id => {
                table.children.push({id: id,name : element, file : "txt"})
              });

            });
            
            //tables.find(table => table.name == tableName).children.push(result);
          }
          commit("SET_TABLES", tables);
          resolve();
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve columns message : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve columns : " + error);
          }
          dispatch("addSnackbar", { id: 0,  aff: true, text: "Erreur lors de la récupération des colonnes.", color: "error"});
          reject(error);
        })
      })
    },

    addNewSavedQuery({dispatch},data) {
      return new Promise( (resolve, reject) => {
        axios.post(`/query/save`,data,{})
        .then(response => {
          if (response.data.status === 'success') {
            dispatch("addSnackbar", { id: 0,  aff: true, text: "La requête a été sauvegardée.", color: "success"});
            resolve("Query successfully saved !");
          }
        })
        .catch(error => {
          if (error.response) {
            console.log("Error saving query : "+ error.response.data.message);
          } else {
            console.log("Error saving query : "+ error);
          }
          reject("Error saving query");
        })
      })
    },


    getQueryResult({commit,getters},{metadataName,modelName,packageName, columns,queryLimit,queryDistinct}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/query/result`,{ params : { repositoryName : getters.repositoryName, groupName : getters.groupName, metadataName : metadataName, modelName : modelName, packageName : packageName, columns: columns, queryLimit: queryLimit ,queryDistinct : queryDistinct } })
        .then(response => {
          if (response.data.status === 'success') {
            
            var result = [];
            var colTable = columns.split(',');
            var responseTab = response.data.result.substring(1, response.data.result.length-2).split("], ");

            //responseTab[responseTab.length - 1 ] = responseTab[responseTab.length - 1 ].splice(0,-1);
            
            responseTab.forEach(el => {
              var tmp = new Object();
              var tmptable = el.substring(1).split(", ");
              for (let i = 0; i < colTable.length; i++) {
                tmp[colTable[i] ] = tmptable[i];
              }
              result.push(tmp);
            });
            
            commit("SET_QUERYRESULT",result);
            resolve();
          }
        }).catch(error => {
          if (error.response) {
            console.log("Error getting query result : "+ error.response.data.message);
          } else {
            console.log("Error getting query result : "+ error);
          }
          reject("Error saving query");
        });
      })
    },

    getQuerySQL({commit,getters},{metadataName,modelName,packageName, columns,queryLimit,queryDistinct}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/query/sql`,{ params : { repositoryName : getters.repositoryName, groupName : getters.groupName, metadataName : metadataName, modelName : modelName, packageName : packageName, columns: columns, queryLimit: queryLimit ,queryDistinct : queryDistinct } })
        .then(response => {
          if (response.data.status === 'success') {                       
            commit("SET_QUERYSQL",response.data.result);
            resolve();
          }
        }).catch(error => {
          if (error.response) {
            console.log("Error getting query SQL : "+ error.response.data.message);
          } else {
            console.log("Error getting query SQL : "+ error);
          }
          reject("Error saving query");
        });
      })
    },


    getTableNewID({state,commit}) {
      var id = state.tables.idCount;
      commit("INC_ID");
      return new Promise( (resolve)=> { resolve(id)});
    }




  
  },
  getters : {
    repositoryName: state => {
      return state.repositories.selected;
    },
    groupName: state => {
      return state.groups.selected;
    },
    tables : state => {
      return state.tables.data;
    }
  },
  modules: {
  }
})
