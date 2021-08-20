import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '../config.json'

axios.defaults.baseURL=config.baseURL;
axios.defaults.headers.common['X-Gravitee-Api-Key'] = "f3510842-ef9b-4ee7-8877-4d59b5d63907";
//X-Gravitee-Api-Key

//console.log("Config baseURL = "+config.baseURL);

//console.log("Axios default = "+ JSON.stringify(axios.defaults));

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reports : [],
    groups : [],
    selectedGroup : null,
    userGroups :  [],
  
    snackbars: {
      id: 0,
      data : []
    },

  },
  mutations: {
    SET_REPORTS(state,reports) {
      state.reports = reports;
    },
    SET_GROUPS(state, groups) {
      state.groups = groups;
    },
    SET_USERGROUPS(state,groups) {
      state.userGroups = groups;
    },
    ADD_SNACKBAR(state, snackbar) {
      state.snackbars.data.push(snackbar);
    },
    REMOVE_SNACKBAR(state, indexOfsnackbar) {
      state.snackbars.data.splice(indexOfsnackbar,1);  
    },
    SELECT_GROUP(state,group) {
      state.selectedGroup = group;
    }


  },
  actions: {
    GetReports({commit,getters}) {
      return new Promise( (resolve,reject) => {
        axios.get("/reports", { params : {repositoryID : 1 , groupID : getters.selectedGroup.id}}).then((response) => {
          if (response.data.status === "success") {
            commit("SET_REPORTS",response.data.result);
          }
          resolve();
        })
        .catch(error => {
          console.log("Error : " + JSON.stringify(error));
          reject();
        })
      })
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


    getUserGroups({commit},{userLogin}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/user/${userLogin}/groups`)
        .then(response => {
          if (response.data.status == "success") {
            commit("SET_USERGROUPS", response.data.result);
          }
          resolve(response.data.result);
        })
        .catch( error => {
          if (error.response.data.message && error.response.data.message.includes("User not found.") ) {
            reject("User not found.");
          } else {
            console.log("Unable to retrieve groups : " + error);
          }
          reject(error);
        })

      });
    },

    getGroups({commit}) {
      return new Promise( (resolve, reject) => {
        axios.get("/groups")
        .then(response => {
          if (response.data.status == "success") {
            commit("SET_GROUPS", response.data.result);
          }
          resolve(response.data.result);
        })
        .catch( error => {
          if (error.reponse) {
            console.log("Unable to retrieve groups : " + error.response.data.message)
          } else {
            console.log("Unable to retrieve groups : " + error);
          }
          reject(error);
        })

      });
    },

    addUser({state},data) {
      return new Promise( (resolve,reject) => {
        state.userLogin = data.login;
        axios.post("/user/create",data,{})
        .then(response => {
          if (response.data.status === 'success') {
            resolve(`L'utilisateur ${data.login} a été crée.`);
          }
        })
        .catch( error => {
          if (error.response) {
            console.log(`Error adding user ${data.login} : ${error.response.data.message}`);
          } else {
            console.log(`Error adding user ${data.login} : ${error}`);
          }
          reject(`Erreur lors de la création de l'utilisateur ${data.login}.`);
        })
      })
    },

    addUserToGroup({state},{userLogin,group}) {

      var data ={
        userLogin: userLogin,
        groupID : group.id
      };   

      return new Promise( (resolve,reject) => {
        axios.post(`/user/group/add`,data,{})
        .then(response => {
          if (response.data.status === 'success') {      
            state.userGroups.push(group.name);            
            resolve (`L'utilisateur ${userLogin} a été ajouté au groupe ${group.name}.`);
          }
        })
        .catch( error => {

          console.log(`Error adding user ${userLogin} to ${group.name}  : `+ error)
                    
          reject(`Erreur lors de l'ajout de ${userLogin} à ${group.name}.`);        
        })
      });
    },    

    removeUserFromGroup({state},{userLogin,group}) {
      var data ={
          userLogin: userLogin,
          groupID : group.id
      };   
      
      return new Promise( (resolve,reject) => {
        axios.post(`/user/group/remove`,data,{})
        .then(response => {
          if (state.userGroups.indexOf(group.name) != -1) {
            state.userGroups.splice(state.groups.data.indexOf(group.name),1)
          }
          if (response.data.status === 'success') {
            resolve (`L'utilisateur ${userLogin} a été retiré du groupe ${group.name}.`);

          }
             
        })
        .catch( error => {

          console.log(`Erreur lors du retrait de l'utilisateur ${userLogin} du groupe ${group.name}  : ` + error);
                    
          reject(`Erreur lors du retrait de l'utilisateur ${userLogin} du groupe ${group.name}.`);        
        })
      });
    },       
 

 
  
  },
  getters : {

    selectedGroup: state => {
      return state.selectedGroup;
    },

  },
  modules: {
  }
})
