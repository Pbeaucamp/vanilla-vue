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
