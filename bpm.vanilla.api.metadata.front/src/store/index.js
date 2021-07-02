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
    repositoryName : "",
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
    SET_GROUPNAME(state, name) {
      state.groupName = name;
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


    getMetadata({commit,getters}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/repository/${getters.repositoryName}/group/${getters.groupName}/metadatas`)
        .then(response => {
          /*console.log("The response : " + response.data.result);
          console.log("The response data : " + JSON.stringify(response.data));
          console.log("The response data status : " + response.data.status);
          console.log("The if : " + (response.data.status == "success"));*/
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
          reject(error);
        })
      })
    },

    getBusinessModels({commit,getters} , metadataName) {
      //console.log("Here's the metadat11a : " + metadataName);
      return new Promise( (resolve, reject) => {
        axios.get(`/repository/${getters.repositoryName}/group/${getters.groupName}/metadata/${metadataName}/models`)
        .then(response => {
          if (response.data.status == "success") {
            commit("SET_MODELS", response.data.result);
          }
          resolve();
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve metadatas message : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve metadatas : " + error);
          }
          reject(error);
        })
      })
    },

    getBusinessPackages({commit,getters} , {metadataName,modelName}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/repository/${getters.repositoryName}/group/${getters.groupName}/metadata/${metadataName}/model/${modelName}/packages`)
        .then(response => {
          if (response.data.status == "success") {
            commit("SET_PACKAGES", response.data.result);
          }
          resolve();
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve metadatas message : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve metadatas : " + error);
          }
          reject(error);
        })
      })
    },


    getTables({commit,getters,dispatch} , {metadataName,modelName,packageName}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/repository/${getters.repositoryName}/group/${getters.groupName}/metadata/${metadataName}/model/${modelName}/package/${packageName}/tables`)
        .then(response => {
          if (response.data.status == "success") {
            var tables = []
            response.data.result.forEach(element => {
              tables.push({id: dispatch("getTableNewID"),name : element, children : []})
            });
            commit("SET_TABLES", tables);
          }
          resolve();
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve metadatas message : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve metadatas : " + error);
          }
          reject(error);
        })
      })
    },

    getColumns({commit,getters,dispatch} , {metadataName,modelName,packageName,tableName}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/repository/${getters.repositoryName}/group/${getters.groupName}/metadata/${metadataName}/model/${modelName}/package/${packageName}/table/${tableName}/columns`)
        .then(response => {
          if (response.data.status == "success") {
            //var result = [];
            var tables = getters.tables;
            var table = tables.find(table => table.name == tableName);
            
            response.data.result.forEach(element => {
              //result.push({name : element, file : "txt"});
              table.children.push({id: dispatch("getTableNewID"),name : element, file : "txt"})
            });
            
            //tables.find(table => table.name == tableName).children.push(result);
          }
          commit("SET_TABLES", tables);
          resolve();
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve metadatas message : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve metadatas : " + error);
          }
          reject(error);
        })
      })
    },


    getTableNewID({state,commit}) {
      var id = state.tables.idCount;
      commit("INC_ID");
      return id;
    }




  
  },
  getters : {
    repositoryName: state => {
      return state.repositoryName;
    },
    groupName: state => {
      return state.groupName;
    },
    tables : state => {
      return state.tables.data;
    }
  },
  modules: {
  }
})
