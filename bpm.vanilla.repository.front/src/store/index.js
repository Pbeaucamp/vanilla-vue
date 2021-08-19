import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '../config.json'

axios.defaults.baseURL=config.baseURL;
axios.defaults.headers.common['X-Gravitee-Api-Key'] = "f3510842-ef9b-4ee7-8877-4d59b5d63907";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: {
      name: 'Utilisateurs',
      data: []
    },
    groups: {
      name: 'Groupes',
      data: []
    },
    repositories: {
      name: 'Repositories',
      data: []
    },
    items: {
      name: 'Items',
      data: []
    },
    temps: {
      name: 'Temps',
      data: []
    },
    // arborescence: {
    //   name: "Arborescence",
    //   data : []
    // }
  },
  mutations: {
    FETCH_USERS(state, users) {
      state.users.data = users;
    },
    FETCH_GROUPS(state, groups) {
      state.groups.data = groups;
    },    
    FETCH_REPOSITORIES(state, repositories) {
      state.repositories.data = repositories;
    },    
    FETCH_ITEMS(state, items) {
      state.items.data = items;
    },    
    FETCH_TEMPS(state, temps) {
      state.temps.data = temps;
    },    
    // FETCH_ARBORESCENCE(state, arborescence) {
    //   state.arborescence.data = arborescence;
    // }
  },
  actions: {
    async getRepositories({commit}, user) {
      var repodata = [];
        await axios.get(`/user/${user}/repositories`)
        .then( response => {
          response.data.result.forEach(elements => {
            if (!repodata.some(e => e.id == elements.id)){
              repodata.push(elements)
            }
          });
        }).catch(error => {
            console.log(`Error retrieving repositories : ` + error.response.data.message);
        })
      commit("FETCH_REPOSITORIES",repodata);
    },

    async getGroups({commit, getters}) {
      var user = getters.users;
      await axios.get(`/user/${user[0].name}/groups`)
      .then( response => {
        commit("FETCH_GROUPS",response.data.result);
      }).catch(error => {
          console.log(`Error retrieving groups : ` + error.response.data.message);
      })
    },

    getItems ({getters}, {repoName, groupName, dirID}){
      var group = getters.groups;
      var repo = getters.repositories;
      var groupID;
      var repoID;
      console.log(group, repo);
      group.forEach(e => {
        if (e.name == groupName){
          groupID = e.id
        }
      })
      repo.forEach(e => {
        if (e.name == repoName){
          repoID = e.id
        }
      })
      console.log(groupID, repoID);
      
      axios.get(`/Items?repoID=${repoID}&grpID=${groupID}&dirID=${dirID.id}`)    
      .then( response =>{
        var temp = response.data.result
        temp.forEach(e =>{
          if (e.type == "DIRECTORY"){
            e.children = []
          }
        })
        dirID.children = temp
      }).catch(error => {
        console.log(`Error retrieving items : ` + error.response.data.message);
      })
    },

    getAllItems ({commit, getters}, {repoName, groupName}){
      var group = getters.groups;
      var repo = getters.repositories;
      var groupID;
      var repoID;
      group.forEach(e => {
        if (e.name === groupName){
          groupID = e.id
        }
      })
      repo.forEach(e => {
        if (e.name == repoName){
          repoID = e.id
        }
      })
      console.log(groupID, repoID);
      axios.get(`/AllItems?repoID=${repoID}&grpID=${groupID}`)    
      .then( response =>{
        commit("FETCH_ITEMS", response.data.result);
      }).catch(error => {
        console.log(`Error retrieving items : ` + error.response.data.message);
      })  
    },



   getItemsRoot ({commit, getters}, {repoName, groupName}){
      var group = getters.groups;
      var repo = getters.repositories;
      var groupID;
      var repoID;
      var data;
      group.forEach(e => {
        if (e.name === groupName){
          groupID = e.id
        }
      })
      repo.forEach(e => {
        if (e.name == repoName){
          repoID = e.id
        }
      })
      console.log(groupID, repoID);
      axios.get(`/Items?repoID=${repoID}&grpID=${groupID}`)    
      .then( response =>{
        // var arbo = []
        data = response.data.result;
        data.forEach(e => {
          if (e.type == "DIRECTORY"){
            e.children = []
          }
          // arbo.push({
          //   ID : e.id,
          //   parentID : 0
          // })
        })
        // commit("FETCH_ARBORESCENCE", arbo)
        // console.log(arbo);
        commit("FETCH_ITEMS", response.data.result);
      }).catch(error => {
        console.log(`Error retrieving items : ` + error.response.data.message);
      })
    },

    getTemps({commit}, {repoName, groupName}){
      var data = {
        repoName : repoName,
        groupName : groupName
      }
      commit("FETCH_TEMPS", data)
    },

    getUser({commit}, user){
      console.log(user);
      var vartemp = [{
        name : user
      }]
      console.log(vartemp);
      commit("FETCH_USERS", vartemp)
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
            state.groups.data.push(group.name);            
            resolve (`L'utilisateur ${userLogin} a été ajouté au groupe ${group.name}.`);
          }
        })
        .catch( error => {
          if (error.response) {
            console.log(`Error adding user ${userLogin} to ${group.name}  : `+ error.response.data.message)
          }                 
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
          if (state.groups.data.indexOf(group.name) != -1) {
            state.groups.data.splice(state.groups.data.indexOf(group.name),1)
          }
          if (response.data.status === 'success') {
            resolve (`L'utilisateur ${userLogin} a été retiré du groupe ${group.name}.`);

          }
             
        })
        .catch( error => {
          if (error.response) {
            console.log(`Erreur lors du retrait de l'utilisateur ${userLogin} du groupe ${group.name}  : ` + error.response.data.message);
          }               
          reject(`Erreur lors du retrait de l'utilisateur ${userLogin} du groupe ${group.name}.`);        
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

    getUserGroups({state},{userLogin}) {
      return new Promise( (resolve, reject) => {
        axios.get(`/user/${userLogin}/groups`)
        .then(response => {
          if (response.data.status == "success") {
            var groups = [];
            response.data.result.forEach(el => groups.push(el.name));
            state.userLogin = userLogin;
          }
          resolve(response.data.result);
        })
        .catch( error => {
          if (error.response) {
            if (error.response.data.message.includes("User not found.")) {
              reject("User not found.");
            }

          } else {
            console.log("Unable to retrieve groups : " + error);
          }
          reject(error);
        })

      });
    },

    getAllGroups({commit}) {
      return new Promise( (resolve, reject) => {
        axios.get("/groups")
        .then(response => {
          if (response.data.status == "success") {
            commit("SET_GROUPS", []);
          }
          resolve(response.data.result);
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
  },

  getters : {
    users: state => {
      return state.users.data;
    },
    groups: state => {
      return state.groups.data;
    },
    repositories: state => {
      return state.repositories.data;
    },    
    items: state => {
      return state.items.data;
    },   
    temps: state => {
      return state.temps.data;
    }, 
    // arborescence : state => {
    //   return state.arborescence.data;
    // }
  },
  modules: {
  }
})
